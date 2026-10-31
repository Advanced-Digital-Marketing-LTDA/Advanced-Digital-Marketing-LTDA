<script lang="ts">
  import { getContext, onMount } from 'svelte'
  import type { PageProps } from './$types'
  import { SITE_MOTION, type SiteMotion } from '$lib/client/site-motion'
  import { setupReveals } from '$lib/client/reveal'
  import { LOCALE_ROUTES } from '$lib/locale'

  const motion = getContext<SiteMotion>(SITE_MOTION)

  let { data }: PageProps = $props()

  onMount(() => {
    motion.registerHero()
    return setupReveals()
  })

  // Stripe return states (shared with the en-US page). Subject + headline
  // read as one sentence: "Seu pagamento foi aprovado."
  const subject = 'Seu pagamento'

  const headline = $derived(
    data.state === 'confirmed'
      ? 'foi aprovado.'
      : data.state === 'payment_pending'
        ? 'está sendo processado.'
        : data.state === 'payment_unconfirmed'
          ? 'não foi confirmado.'
          : data.state === 'rate_limited'
            ? 'não pôde ser confirmado agora.'
            : 'não pôde ser confirmado.',
  )

  const subtext = $derived(
    data.state === 'confirmed'
      ? 'O Stripe aprovou seu pagamento. Vamos começar seu projeto e enviaremos os próximos passos por e-mail.'
      : data.state === 'payment_pending'
        ? 'O Stripe está processando seu pagamento. Assim que a confirmação chegar, começaremos seu projeto e enviaremos os próximos passos por e-mail.'
        : data.state === 'payment_unconfirmed'
          ? 'O Stripe não confirmou seu pagamento. Se você tentou pagar e voltou para cá, tente novamente ou entre em contato conosco.'
          : data.state === 'rate_limited'
            ? 'Recebemos muitas tentativas de verificação da sua conexão. Aguarde alguns minutos e atualize a página.'
            : 'Não conseguimos confirmar seu pagamento. Tente novamente ou entre em contato conosco.',
  )

  const referenceLabel = $derived(
    data.state === 'confirmed' || data.state === 'payment_pending' ? 'Referência do pagamento' : undefined,
  )

  const referenceValue = $derived(
    data.state === 'confirmed' || data.state === 'payment_pending' ? data.sessionId : undefined,
  )
</script>

<svelte:head>
  <title>
    {data.state === 'confirmed' ? 'Pagamento concluído' : 'Pagamento'} | Advanced Digital Marketing LTDA
  </title>
  <meta
    name="description"
    content="Acompanhe o status do seu pagamento após o checkout com o Stripe."
  />
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="index-home service-page">
  <section class="hero index-hero" class:hero-revealed={motion.state.hero === 'revealed'}>
    <div class="sec-inner hero-inner">
      <div class="hero-kick">
        <span class="jp" data-hero-reveal style="--hero-delay:0ms">「契約」</span>
        <span class="en" data-hero-reveal style="--hero-delay:60ms">Pagamento</span>
      </div>
      <p class="hero-line1" data-hero-reveal style="--hero-delay:120ms">Obrigado<b>.</b></p>
      <h1 class="hero-h1">
        <span class="h-mask"><span class="h-line" data-hero-reveal style="--hero-delay:180ms">{subject}</span></span>
        <span class="h-mask"><span class="h-line" data-hero-reveal style="--hero-delay:270ms"><em>{headline}</em></span></span>
      </h1>
      <div class="hero-row">
        <p class="hero-sub" data-hero-reveal style="--hero-delay:440ms">
          {subtext}
        </p>
        {#if referenceLabel && referenceValue}
          <p class="hero-sub" data-hero-reveal style="--hero-delay:480ms">
            {referenceLabel}: {referenceValue}
          </p>
        {/if}
      </div>
      <div class="cta-row" data-hero-reveal style="--hero-delay:520ms">
        <a class="btn btn-solid" href={LOCALE_ROUTES.home['pt-BR']}>Voltar ao início</a>
      </div>
    </div>
  </section>
</div>
