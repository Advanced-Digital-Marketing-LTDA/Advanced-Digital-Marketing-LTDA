<script lang="ts">
  import { browser } from '$app/environment'
  import { SITE_ORIGIN, BLOG_INDEX_COPY, type Locale } from '$lib/locale'
  import { resolveCopy } from '$lib/localized-copy'
  let { articles, locale }: { articles: { slug: string; title: string; category?: string; description: string; published: string }[]; locale: Locale } = $props()
  let copy = $derived(resolveCopy<{description:string;title:string;intro:string;review:string;read:string;guide:string;more:string}>(BLOG_INDEX_COPY, locale))
  let prefix = $derived(locale === 'pt-BR' ? '/pt-br' : '')
  $effect(() => { if (browser) document.documentElement.lang = locale })
</script>
<svelte:head>
  <title>Blog | Advanced Digital Marketing LTDA</title>
  <meta name="description" content={copy.description} />
  <link rel="alternate" hreflang="en-US" href={`${SITE_ORIGIN}/blog/`} />
  <link rel="alternate" hreflang="pt-BR" href={`${SITE_ORIGIN}/pt-br/blog/`} />
  <link rel="alternate" hreflang="x-default" href={`${SITE_ORIGIN}/blog/`} />
</svelte:head>
<section class="blog-gateway"><div class="blog-gateway__inner">
  <header class="blog-gateway__header"><p class="section-label"><span class="font-jp">記事</span> Blog</p><h1 class="blog-gateway__title">{copy.title}</h1><p class="blog-gateway__intro">{copy.intro}</p></header>
  <div class="blog-index-list">
    {#each articles as article (article.slug)}
      <a class="blog-card" href={`${prefix}/blog/${article.slug}/`}>
        <div class="blog-card__meta"><span>{article.category === 'Guide' ? 'Guide' : copy.review}</span><time datetime={article.published}>{article.published}</time></div>
        <h2>{article.title}</h2><p>{article.description}</p><span class="blog-card__link">{article.category === 'Guide' ? copy.guide : copy.read} <span aria-hidden="true">→</span></span>
      </a>
    {/each}
    {#if copy.more}<p><a href="/blog/">{copy.more}</a></p>{/if}
  </div>
</div></section>
