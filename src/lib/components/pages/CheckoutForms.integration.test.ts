/**
 * Guards the two checkout forms (SubscribeSection, WebsiteBuildPricing) on
 * both locales: they show the USD amounts Stripe charges and payment copy
 * that names Stripe. The forms submit through `fetchCheckoutUrl`, which only
 * posts to /api/checkout/stripe (see src/lib/client/checkout.unit.test.ts).
 */
import { describe, expect, it } from 'vitest'
import { render } from 'svelte/server'
import SubscribeSection from './SubscribeSection.svelte'
import WebsiteBuildPricing from './WebsiteBuildPricing.svelte'

const MERCADO_PAGO = /mercado ?pago/i

/** Every displayed price cell and the total of a rendered form. */
function priceCells(body: string): string[] {
  return [...body.matchAll(/<span class="sub-price"><b>([^<]*)<\/b>|<div class="sub-total"[^>]*>\s*<span>[^<]*<\/span>\s*<b>([^<]*)</g)].map(
    (match) => match[1] ?? match[2],
  )
}

describe('SubscribeSection (Stripe, USD)', () => {
  it('pt-BR shows USD amounts and Portuguese Stripe copy', () => {
    const { body } = render(SubscribeSection, { props: { locale: 'pt-BR', preselect: ['seo-content', 'hosting'] } })
    expect(body).toContain('<b>Conteúdo SEO</b>')
    expect(body).toContain('<b>$400.00</b>')
    expect(body).toContain('<b>$60.00</b>')
    expect(body).toMatch(/<span>Total mensal<\/span>\s*<b>\$460\.00<small>\/mês<\/small><\/b>/)
    expect(body).toContain('Você paga pelo Stripe, em dólares americanos (USD).')
    expect(body).toContain('Assinar com Stripe')
    expect(body).toContain('Você conclui o pagamento no ambiente seguro do Stripe.')
    const prices = priceCells(body)
    expect(prices.length).toBeGreaterThan(1)
    for (const price of prices) expect(price).toMatch(/^\$[\d,]+\.\d{2}$/)
    expect(body).not.toMatch(MERCADO_PAGO)
  })

  it('pt-BR shows the US$ ad-spend label and minimum for an ads service', () => {
    const { body } = render(SubscribeSection, { props: { locale: 'pt-BR', preselect: ['paid-search'] } })
    expect(body).toContain('Investimento mensal em anúncios (US$)')
    expect(body).toContain('10% do investimento, mínimo de US$ 100')
    expect(body).toContain('<b>$100.00</b>')
  })

  it('en-US keeps its USD amounts and Stripe copy', () => {
    const { body } = render(SubscribeSection, { props: { locale: 'en-US', preselect: ['seo-content', 'hosting'] } })
    expect(body).toMatch(/<span>Monthly total<\/span>\s*<b>\$460\.00<small>\/mo<\/small><\/b>/)
    expect(body).toContain('Subscribe with Stripe')
    expect(body).not.toMatch(MERCADO_PAGO)
  })
})

describe('WebsiteBuildPricing (Stripe, USD)', () => {
  it('pt-BR shows the USD build price Stripe charges and the Portuguese CTA', () => {
    const { body } = render(WebsiteBuildPricing, { props: { locale: 'pt-BR' } })
    expect(body).toContain('<b>$750</b>')
    expect(body).toContain('Comprar site')
    expect(body).toContain('<b class="build-name">Desenvolvimento de Site</b>')
    expect(body).not.toContain('R$')
    expect(body).not.toMatch(MERCADO_PAGO)
  })

  it('en-US keeps its USD build price', () => {
    const { body } = render(WebsiteBuildPricing, { props: { locale: 'en-US' } })
    expect(body).toContain('<b>$750</b>')
    expect(body).toContain('Buy this website')
  })
})
