<script lang="ts">
  import { browser } from '$app/environment'
  import type { PageServerData } from './$types'
  let { data }: { data: PageServerData } = $props()
  $effect(() => { if (browser) document.documentElement.lang = 'pt-BR' })
</script>

<svelte:head>
  <title>Blog | Advanced Digital Marketing LTDA</title>
  <meta name="description" content="Experiências e guias sobre busca, visibilidade em IA, mídia paga e desenvolvimento web." />
  <link rel="alternate" hreflang="en-US" href="https://advanceddigitalmarketingltda.com/blog/" />
  <link rel="alternate" hreflang="pt-BR" href="https://advanceddigitalmarketingltda.com/pt-br/blog/" />
</svelte:head>
<section class="blog-gateway">
  <div class="blog-gateway__inner">
    <header class="blog-gateway__header">
      <p class="section-label"><span class="font-jp">記事</span> Blog</p>
      <h1 class="blog-gateway__title">Ideias para os mecanismos de resposta.</h1>
      <p class="blog-gateway__intro">Notas sobre busca, visibilidade em IA, mídia paga e sistemas digitais.</p>
    </header>
    <div class="blog-index-list">
      {#each data.articles as article (article.slug)}
        <a class="blog-card" href={`/pt-br/blog/${article.slug}/`}>
          <div class="blog-card__meta"><span>Avaliação</span><time datetime={article.published}>{article.published}</time></div>
          <h2>{article.title}</h2><p>{article.description}</p><span class="blog-card__link">Leia a avaliação <span aria-hidden="true">→</span></span>
        </a>
      {/each}
    </div>
  </div>
</section>
