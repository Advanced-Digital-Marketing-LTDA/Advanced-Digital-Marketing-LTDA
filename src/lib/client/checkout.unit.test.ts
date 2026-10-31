/**
 * Browser-side checkout fetch contract (src/lib/client/checkout.ts).
 *
 * Both checkout forms (subscriptions and one-time builds) on both locales go
 * through `fetchCheckoutUrl`, which always POSTs to the single Stripe endpoint
 * — there is no per-locale endpoint left to pick. A success is only a success
 * when it carries a checkout URL (AGENTS.md: no silent fallbacks).
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CHECKOUT_ENDPOINT, fetchCheckoutUrl } from './checkout'

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })
}

describe('fetchCheckoutUrl', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('posts every locale’s payload as JSON to the Stripe checkout endpoint', async () => {
    expect(CHECKOUT_ENDPOINT).toBe('/api/checkout/stripe')
    const fetchMock = vi.fn(async (_url: string, _init: RequestInit) => jsonResponse({ checkoutUrl: 'https://checkout.stripe.com/c/pay/cs_1' }))
    vi.stubGlobal('fetch', fetchMock)
    for (const locale of ['pt-BR', 'en-US']) {
      const body = { flow: 'build', type: 'website', kind: 'new', idempotencyKey: 'k', locale }
      await expect(fetchCheckoutUrl(body)).resolves.toEqual({
        ok: true,
        checkoutUrl: 'https://checkout.stripe.com/c/pay/cs_1',
      })
      const [url, init] = fetchMock.mock.calls.at(-1) as [string, RequestInit]
      expect(url).toBe('/api/checkout/stripe')
      expect(init.method).toBe('POST')
      expect(JSON.parse(String(init.body))).toEqual(body)
    }
  })

  it('returns the server error code on a non-2xx response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ error: 'invalid_locale' }, 400)))
    await expect(fetchCheckoutUrl({})).resolves.toEqual({ ok: false, errorCode: 'invalid_locale' })
  })

  it('fails loudly with invalid_response when a 200 carries no checkout URL', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ ok: true })))
    await expect(fetchCheckoutUrl({})).resolves.toEqual({ ok: false, errorCode: 'invalid_response' })
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('/api/checkout/stripe'), { ok: true })
  })

  it('fails loudly without a code when the request itself fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('network down')))
    await expect(fetchCheckoutUrl({})).resolves.toEqual({ ok: false })
    expect(errorSpy).toHaveBeenCalled()
  })
})
