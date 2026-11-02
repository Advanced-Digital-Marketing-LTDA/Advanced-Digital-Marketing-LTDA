<script lang="ts">
  /**
   * Mix-and-match monthly subscription configurator (spec §3).
   *
   * Both locales run the same checkout flow — select services, enter ad spend
   * (US$), email, and redirect to Stripe Checkout, billed in USD (activated by
   * STRIPE_SECRET_KEY; see docs/stripe-checkout.md). Only the copy differs.
   *
   * The total shown here is a client-side mirror for display only. The server
   * independently recalculates every price; a manipulated browser total can
   * never change what Stripe bills.
   */
  import { untrack } from 'svelte'
  import {
    CATALOG_SERVICE_IDS,
    SERVICES,
    adSpendFeeUSD,
    formatUSD,
    isSubscribable,
    type CatalogServiceId,
  } from '$lib/catalog'
  import { BRL_USD_REFERENCE_RATE } from '$lib/catalog'
  import { parseUSDInput } from '$lib/usd'
  import { fetchCheckoutUrl } from '$lib/client/checkout'
  import type { Locale } from '$lib/locale'

  let {
    locale,
    preselect = [],
  }: { locale: Locale; preselect?: CatalogServiceId[] } = $props()

  const subscribable = CATALOG_SERVICE_IDS.filter((id) => isSubscribable(SERVICES[id]))
  const adsIds = subscribable.filter((id) => SERVICES[id].pricing.kind === 'ads-spend')

  // Seed the selection once from the (static) preselect prop. Toggling after
  // mount is fully user-controlled; preselect never changes per page.
  let selected = $state<Set<CatalogServiceId>>(initialSelectionFor())
  let spends = $state<Partial<Record<CatalogServiceId, string>>>({})
  let email = $state('')
  let submitting = $state(false)
  let errorMessage = $state<string | undefined>(undefined)
  // Stable per checkout session: reused across retries so Stripe's
  // Idempotency-Key dedupes a double-submit or a retry after a network drop.
  let idempotencyKey = $state<string | undefined>(undefined)
  let payloadFingerprint = $state('')

  const copy = {
    'en-US': {
      kicker: 'Subscribe',
      heading: 'Build your monthly package.',
      lead: 'Pick the services you want and watch the monthly total update as you go. You will complete the payment on Stripe in USD.',
      adSpendLabel: 'Monthly ad spend (US$)',
      adSpendHint: '10% of spend, $100 minimum',
      perMonth: '/mo',
      total: 'Monthly total',
      emailLabel: 'Email',
      emailPlaceholder: 'you@company.com',
      cta: 'Subscribe with Stripe',
      submitting: 'Redirecting to Stripe...',
      secureNote: 'You will continue in Stripe\u2019s secure environment to complete the payment.',
      selectOne: 'Select at least one service.',
      invalidEmail: 'Enter a valid email address.',
      invalidSpend: 'Enter a valid monthly ad spend for the ads services.',
    },
    'pt-BR': {
      kicker: 'Assine',
      heading: 'Monte seu pacote mensal.',
      lead: 'Escolha os serviços e veja o total mensal na hora. Você paga pelo Stripe, em dólares americanos (USD).',
      adSpendLabel: 'Investimento mensal em anúncios (US$)',
      adSpendHint: '10% do investimento, mínimo de US$ 100',
      perMonth: '/mês',
      total: 'Total mensal',
      emailLabel: 'E-mail',
      emailPlaceholder: 'voce@empresa.com.br',
      cta: 'Assinar com Stripe',
      submitting: 'Redirecionando para o Stripe...',
      secureNote: 'Você conclui o pagamento no ambiente seguro do Stripe.',
      selectOne: 'Selecione ao menos um serviço.',
      invalidEmail: 'Informe um e-mail válido.',
      invalidSpend: 'Informe um valor de investimento mensal válido para os anúncios.',
    },
  } as const

  let text = $derived(copy[locale])

  /** One-time seed of the checkbox state from the static preselect prop. */
  function initialSelectionFor(): Set<CatalogServiceId> {
    return new Set(preselect.filter((id) => isSubscribable(SERVICES[id])))
  }

  // Reseed when the route's preselect changes: in-app navigation between two
  // [slug] service pages reuses this component, so the $state initializer does
  // not run again (e.g. paid-search → meta-ads would keep paid-search checked).
  $effect(() => {
    const next = initialSelectionFor()
    untrack(() => {
      if (next.size !== selected.size || [...next].some((id) => !selected.has(id))) {
        selected = next
        // Drop ad-spend inputs from the previous service page — they describe
        // a package the visitor no longer has selected, and reusing them would
        // quote a stale amount. A fresh payload also needs a fresh idempotency
        // key (payloadFingerprint mismatch regenerates it on submit).
        spends = {}
        errorMessage = undefined
        payloadFingerprint = ''
      }
    })
  })

  /** Parses a US$ ad-spend input (both locales bill USD) — the SAME parser
   *  must validate and price, so an entry the checkout would reject can never
   *  silently price as 0. */
  function parseSpend(value: string): number | undefined {
    return parseUSDInput(value)
  }

  function spendOf(id: CatalogServiceId): number {
    const value = spends[id]
    if (value === undefined) return 0
    return parseSpend(value) ?? 0
  }

  /** Monthly USD amount of one service — the checkout currency on every locale. */
  function monthlyUSDOf(id: CatalogServiceId): number {
    const pricing = SERVICES[id].pricing
    if (pricing.kind === 'fixed') return pricing.monthlyUSD ?? pricing.monthlyBRL / BRL_USD_REFERENCE_RATE
    // ads-spend services show their live fee (or the minimum).
    return adSpendFeeUSD(spendOf(id))
  }

  function priceOf(id: CatalogServiceId): { amount: string } {
    return { amount: formatUSD(monthlyUSDOf(id)) }
  }

  // Client-side display total in the checkout currency (USD on every locale).
  // The server independently reprices everything; this is display only.
  let totalAmount = $derived(
    subscribable.reduce((sum, id) => (selected.has(id) ? sum + monthlyUSDOf(id) : sum), 0),
  )

  function toggle(id: CatalogServiceId) {
    const next = new Set(selected)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    selected = next
  }

  function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
  }

  let genericError = $derived(
    locale === 'pt-BR'
      ? 'Não foi possível iniciar o pagamento pelo Stripe. Tente novamente.'
      : 'Could not start the Stripe payment. Please try again.',
  )

  function errorMessageFor(code: string | undefined): string {
    switch (code) {
      case 'invalid_email':
        return text.invalidEmail
      case 'invalid_ad_spend':
        return text.invalidSpend
      case 'invalid_service':
      case 'service_unavailable':
      case 'quote_only_service':
        return locale === 'pt-BR'
          ? 'Um dos serviços selecionados não está mais disponível. Atualize a página.'
          : 'One of the selected services is no longer available. Refresh the page.'
      case 'no_services_selected':
        return text.selectOne
      case 'missing_credentials':
        return locale === 'pt-BR'
          ? 'O pagamento ainda não está configurado. Tente novamente mais tarde.'
          : 'Payments are not configured yet. Please try again later.'
      case 'client_address_unavailable':
        return locale === 'pt-BR'
          ? 'Não foi possível identificar sua conexão. Tente novamente mais tarde.'
          : 'Could not identify your connection. Please try again later.'
      case 'rate_limited':
        return locale === 'pt-BR'
          ? 'Muitas tentativas. Aguarde alguns minutos e tente novamente.'
          : 'Too many attempts. Please try again in a few minutes.'
      default:
        return genericError
    }
  }

  async function submit() {
    if (submitting) return
    errorMessage = undefined

    if (selected.size === 0) {
      errorMessage = text.selectOne
      return
    }
    for (const id of adsIds) {
      if (selected.has(id) && parseSpend(spends[id] ?? '') === undefined) {
        errorMessage = text.invalidSpend
        return
      }
    }
    if (!isValidEmail(email)) {
      errorMessage = text.invalidEmail
      return
    }

    submitting = true
    try {
      const serviceIds = subscribable.filter((id) => selected.has(id))
      const config: Record<string, { monthlyAdSpend: number }> = {}
      for (const id of adsIds) {
        if (selected.has(id)) config[id] = { monthlyAdSpend: spendOf(id) }
      }

      // Regenerate the idempotency key whenever the checkout payload changes:
      // a retry after a lost response must not bind the customer to a stale
      // package, while retrying the SAME payload reuses the key so Stripe's
      // Idempotency-Key dedupes it.
      const fingerprint = `${email.trim()}|${serviceIds.join(',')}|${JSON.stringify(config)}`
      if (fingerprint !== payloadFingerprint) {
        idempotencyKey = crypto.randomUUID()
        payloadFingerprint = fingerprint
      }

      // Both locales bill USD through the same Stripe checkout.
      const result = await fetchCheckoutUrl({
        flow: 'subscription',
        email: email.trim(),
        serviceIds,
        config,
        idempotencyKey,
        locale,
      })
      if (!result.ok) {
        errorMessage = errorMessageFor(result.errorCode)
        return
      }

      // Full-page redirect: the browser address bar visibly leaves our domain.
      window.location.assign(result.checkoutUrl)
    } catch (error) {
      // Fail loudly on the server log; keep the generic message user-facing.
      console.error('[checkout] subscription preparation failed', error)
      errorMessage = genericError
    } finally {
      submitting = false
    }
  }
</script>

<section class="paper-sec subscribe-panel" id="subscribe">
  <div class="kanji ink-stroke" style="left:-6vw;bottom:-10%" aria-hidden="true">契約</div>
  <div class="sec-inner">
    <span class="sec-jp rise">{text.kicker}<span class="font-jp">契約</span></span>
    <h2 class="shear">{text.heading}</h2>
    <p class="sec-lead rise">{text.lead}</p>

    <div class="sub-list">
      {#each subscribable as id (id)}
        {@const service = SERVICES[id]}
        {@const price = priceOf(id)}
        <div class="sub-row" class:on={selected.has(id)}>
          <label class="sub-check">
            <!-- Selection is a display-only calculator on every locale (the
                 checkout form itself only renders on pt-BR); disabling it on
                 en-US made the ad-spend total impossible to explore there. -->
            <input
              type="checkbox"
              checked={selected.has(id)}
              onchange={() => toggle(id)}
              disabled={submitting}
            />
            <span class="sub-name">
              <b>{service.name[locale]}</b>
              <i>{service.description[locale]}</i>
            </span>
          </label>
          <span class="sub-price">
            <b>{price.amount}</b>
          </span>
          {#if service.pricing.kind === 'ads-spend' && selected.has(id)}
            <label class="sub-spend">
              <span>{text.adSpendLabel}</span>
              <input
                type="text"
                inputmode="decimal"
                placeholder="0"
                value={spends[id] ?? ''}
                oninput={(e) => (spends[id] = (e.currentTarget as HTMLInputElement).value)}
                disabled={submitting}
              />
              <small>{text.adSpendHint}</small>
            </label>
          {/if}
        </div>
      {/each}
    </div>

    <div class="sub-total" aria-live="polite" aria-atomic="true">
      <span>{text.total}</span>
      <b>{formatUSD(totalAmount)}<small>{text.perMonth}</small></b>
    </div>

    <form class="sub-checkout" onsubmit={(e) => { e.preventDefault(); submit() }}>
        <label class="sub-email">
          <span>{text.emailLabel}</span>
          <input
            type="email"
            autocomplete="email"
            placeholder={text.emailPlaceholder}
            value={email}
            oninput={(e) => (email = (e.currentTarget as HTMLInputElement).value)}
            disabled={submitting}
          />
        </label>

        {#if errorMessage}
          <p class="sub-error" role="alert">{errorMessage}</p>
        {/if}

        <button class="btn btn-solid" type="submit" disabled={submitting}>
          {submitting ? text.submitting : text.cta}
        </button>
        <p class="sub-note">{text.secureNote}</p>
      </form>
  </div>
</section>
