/**
 * Guards both Stripe return pages — en-US (src/routes/checkout/complete/) and
 * pt-BR (src/routes/pt-br/checkout/complete/), which share
 * src/lib/server/stripe-completion.ts: live session verification before any
 * success claim, malformed-id rejection, per-IP rate limiting, and truthful
 * unconfirmed states. Every case runs against each route's own `load`, so the
 * two locales cannot drift apart.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { StripeCompletionState } from './stripe-completion'
import { load as englishLoad } from '../../routes/checkout/complete/+page.server'
import { load as portugueseLoad } from '../../routes/pt-br/checkout/complete/+page.server'
import { getCheckoutSession, StripeError } from '$lib/server/stripe'
import { resetRateLimitBuckets } from '$lib/server/rate-limit'

vi.mock('$lib/server/stripe', async (importOriginal) => {
  const actual = await importOriginal<typeof import('$lib/server/stripe')>()
  return { ...actual, getCheckoutSession: vi.fn() }
})

const mockGetSession = vi.mocked(getCheckoutSession)

const ROUTES = [
  { locale: 'en-US', path: '/checkout/complete/', routeLoad: englishLoad },
  { locale: 'pt-BR', path: '/pt-br/checkout/complete/', routeLoad: portugueseLoad },
] as const

const paidSession = {
  id: 'cs_test_1',
  status: 'complete',
  paymentStatus: 'paid',
  customerEmail: 'customer@example.com',
  amountTotal: 460,
  currency: 'usd',
  clientReferenceId: 'seo-content+hosting',
}

describe.each(ROUTES)('$path (Stripe, $locale) load', ({ path, routeLoad }) => {
  const loadArgs = (query: string, ip = '203.0.113.9') => ({
    url: new URL(`https://example.com${path}${query}`),
    request: new Request(`https://example.com${path}${query}`),
    getClientAddress: (): string => ip,
    setHeaders: () => undefined,
  })
  const load = (args: ReturnType<typeof loadArgs>) => routeLoad(args as never) as Promise<StripeCompletionState>

  beforeEach(() => {
    mockGetSession.mockReset()
    resetRateLimitBuckets()
  })

  afterEach(() => vi.unstubAllEnvs())

  it('reports missing when there is no session_id', async () => {
    expect(await load(loadArgs(''))).toEqual({ state: 'missing' })
    expect(mockGetSession).not.toHaveBeenCalled()
  })

  it('confirms only a paid session and surfaces the verified amount', async () => {
    mockGetSession.mockResolvedValue(paidSession)
    expect(await load(loadArgs('?session_id=cs_test_1'))).toEqual({
      state: 'confirmed',
      sessionId: 'cs_test_1',
      amountTotal: 460,
      clientReferenceId: 'seo-content+hosting',
    })
  })

  it('confirms every server-created catalog package and website-build combo', async () => {
    const combos = [
      { clientReferenceId: 'seo-content', amountTotal: 400 },
      { clientReferenceId: 'backlinks', amountTotal: 600 },
      { clientReferenceId: 'hosting', amountTotal: 60 },
      { clientReferenceId: 'website-build:website:new', amountTotal: 750 },
      { clientReferenceId: 'website-build:website:migration', amountTotal: 1500 },
      { clientReferenceId: 'website-build:ecommerce:new', amountTotal: 1500 },
      { clientReferenceId: 'website-build:ecommerce:migration', amountTotal: 3000 },
      { clientReferenceId: 'paid-search', amountTotal: 100 },
      { clientReferenceId: 'seo-content+meta-ads', amountTotal: 500 },
    ]
    for (const patch of combos) {
      mockGetSession.mockResolvedValue({ ...paidSession, ...patch })
      expect(await load(loadArgs('?session_id=cs_test_1'))).toEqual({
        state: 'confirmed',
        sessionId: 'cs_test_1',
        amountTotal: patch.amountTotal,
        clientReferenceId: patch.clientReferenceId,
      })
    }
  })

  it('never claims success for a paid session not bound to a server-created checkout', async () => {
    // Binding rule: a wrong client_reference_id, amount or currency must
    // render the loud error state, never the success.
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    try {
      const mismatches = [
        { clientReferenceId: 'unrelated:product:1', amountTotal: 460, currency: 'usd' },
        { clientReferenceId: 'seo-content+hosting', amountTotal: 459, currency: 'usd' },
        { clientReferenceId: 'seo-content+hosting', amountTotal: 460, currency: 'brl' },
        { clientReferenceId: null, amountTotal: 460, currency: 'usd' },
        { clientReferenceId: 'website-build:website:new', amountTotal: 749, currency: 'usd' },
        { clientReferenceId: 'seo-content+seo-content', amountTotal: 800, currency: 'usd' },
        { clientReferenceId: 'backlinks+seo-content', amountTotal: 1000, currency: 'usd' },
        { clientReferenceId: 'paid-search', amountTotal: 99, currency: 'usd' },
        { clientReferenceId: 'unknown-service', amountTotal: 460, currency: 'usd' },
      ]
      for (const patch of mismatches) {
        mockGetSession.mockResolvedValue({ ...paidSession, ...patch })
        expect(await load(loadArgs('?session_id=cs_test_1'))).toEqual({ state: 'error' })
      }
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('does not match a server-created checkout'))
    } finally {
      warnSpy.mockRestore()
    }
  })

  it('reports pending while the session is open', async () => {
    mockGetSession.mockResolvedValue({ ...paidSession, status: 'open', paymentStatus: 'unpaid' })
    expect(await load(loadArgs('?session_id=cs_test_1'))).toEqual({
      state: 'payment_pending',
      sessionId: 'cs_test_1',
    })
  })

  it('never labels a pending session for another product as this site’s checkout', async () => {
    // The pending branch applies the same binding rule as the paid branch: an
    // open/processing session with a wrong client_reference_id, amount or
    // currency must render the error state, not "your payment is being
    // processed" for a checkout this server never created.
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    try {
      const mismatches = [
        { clientReferenceId: 'unrelated:product:1', amountTotal: 460, currency: 'usd' },
        { clientReferenceId: 'seo-content+hosting', amountTotal: 459, currency: 'usd' },
        { clientReferenceId: 'seo-content+hosting', amountTotal: 460, currency: 'brl' },
        { clientReferenceId: null, amountTotal: 460, currency: 'usd' },
        { clientReferenceId: 'website-build:website:new', amountTotal: 749, currency: 'usd' },
      ]
      for (const patch of mismatches) {
        mockGetSession.mockResolvedValue({ ...paidSession, status: 'open', paymentStatus: 'unpaid', ...patch })
        expect(await load(loadArgs('?session_id=cs_test_1'))).toEqual({ state: 'error' })
      }
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('refusing pending claim'))
    } finally {
      warnSpy.mockRestore()
    }
  })

  it('reports unconfirmed for a complete-but-unpaid session (never claims success)', async () => {
    mockGetSession.mockResolvedValue({ ...paidSession, status: 'complete', paymentStatus: 'unpaid' })
    expect(await load(loadArgs('?session_id=cs_test_1'))).toEqual({
      state: 'payment_unconfirmed',
      sessionId: 'cs_test_1',
    })
  })

  it('rejects malformed session ids without touching the API', async () => {
    expect(await load(loadArgs('?session_id=<script>'))).toEqual({ state: 'error' })
    expect(mockGetSession).not.toHaveBeenCalled()
  })

  it('maps API failures to the error state loudly', async () => {
    mockGetSession.mockRejectedValue(new StripeError('api_error', 'boom'))
    expect(await load(loadArgs('?session_id=cs_test_1'))).toEqual({ state: 'error' })
  })

  it('reports error when the session does not exist', async () => {
    mockGetSession.mockResolvedValue(undefined)
    expect(await load(loadArgs('?session_id=cs_missing'))).toEqual({ state: 'error' })
  })

  it('marks every result private and uncacheable for the CDN', async () => {
    mockGetSession.mockResolvedValue(paidSession)
    for (const query of ['', '?session_id=cs_test_1']) {
      const headers: Record<string, string>[] = []
      await routeLoad({ ...loadArgs(query), setHeaders: (value: Record<string, string>) => headers.push(value) } as never)
      expect(headers).toEqual([{ 'Cache-Control': 'private, no-store' }])
    }
  })

  it('rate-limits verification per client', async () => {
    mockGetSession.mockResolvedValue(paidSession)
    for (let i = 0; i < 10; i += 1) {
      expect((await load(loadArgs('?session_id=cs_test_1'))).state).toBe('confirmed')
    }
    expect(await load(loadArgs('?session_id=cs_test_1'))).toEqual({ state: 'rate_limited' })
  })
})
