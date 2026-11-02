/**
 * Guards the pt-BR Stripe return page copy (src/routes/pt-br/checkout/complete/):
 * every state the shared Stripe verification returns renders an honest
 * Portuguese message that names Stripe, and only verified states show the
 * payment reference. The load logic itself is covered for both locales in
 * src/lib/server/stripe-completion.integration.test.ts.
 */
import { describe, expect, it } from 'vitest'
import { render } from 'svelte/server'
import Page from './+page.svelte'
import { SITE_MOTION, type SiteMotion } from '$lib/client/site-motion'
import type { StripeCompletionState } from '$lib/server/stripe-completion'

const motion: SiteMotion = {
  state: { curtainReady: true, hero: 'waiting' },
  registerHero: () => undefined,
  revealHero: () => undefined,
  completeCurtain: () => undefined,
}

function renderState(data: StripeCompletionState) {
  return render(Page, {
    props: { data } as never,
    context: new Map<symbol, unknown>([[SITE_MOTION, motion]]),
  })
}

describe('/pt-br/checkout/complete/ copy (Stripe)', () => {
  it.each([
    [
      { state: 'confirmed', sessionId: 'cs_test_1', amountTotal: 460, clientReferenceId: 'seo-content+hosting' },
      'foi aprovado.',
      'O Stripe aprovou seu pagamento.',
    ],
    [{ state: 'payment_pending', sessionId: 'cs_test_1' }, 'está sendo processado.', 'O Stripe está processando seu pagamento.'],
    [{ state: 'payment_unconfirmed', sessionId: 'cs_test_1' }, 'não foi confirmado.', 'O Stripe não confirmou seu pagamento.'],
    [{ state: 'rate_limited' }, 'não pôde ser confirmado agora.', 'Recebemos muitas tentativas de verificação'],
    [{ state: 'error' }, 'não pôde ser confirmado.', 'Não conseguimos confirmar seu pagamento.'],
    [{ state: 'missing' }, 'não pôde ser confirmado.', 'Não conseguimos confirmar seu pagamento.'],
  ] as const)('renders the Portuguese message for %o', (data, headline, subtext) => {
    const { body, head } = renderState(data)
    expect(body).toContain('Seu pagamento')
    expect(body).toContain(`<em>${headline}</em>`)
    expect(body).toContain(subtext)
    expect(body).toContain('href="/pt-br/"')
    expect(head).toContain('checkout com o Stripe')
    expect(`${head}${body}`).not.toMatch(/mercado ?pago/i)
  })

  it('shows the payment reference only for verified paid or pending sessions', () => {
    expect(renderState({ state: 'confirmed', sessionId: 'cs_test_9', amountTotal: 400, clientReferenceId: 'seo-content' }).body).toContain(
      'Referência do pagamento: cs_test_9',
    )
    expect(renderState({ state: 'payment_pending', sessionId: 'cs_test_9' }).body).toContain('Referência do pagamento: cs_test_9')
    expect(renderState({ state: 'payment_unconfirmed', sessionId: 'cs_test_9' }).body).not.toContain('Referência do pagamento')
    expect(renderState({ state: 'error' }).body).not.toContain('Referência do pagamento')
  })

  it('titles only a confirmed payment as completed', () => {
    expect(renderState({ state: 'confirmed', sessionId: 'cs_test_1', amountTotal: 400, clientReferenceId: 'seo-content' }).head).toContain(
      'Pagamento concluído',
    )
    expect(renderState({ state: 'payment_pending', sessionId: 'cs_test_1' }).head).not.toContain('Pagamento concluído')
  })
})
