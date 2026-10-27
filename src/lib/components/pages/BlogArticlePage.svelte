<script lang="ts">
  import { browser } from '$app/environment'
  import { SITE_ORIGIN } from '$lib/locale'
  import type { BlogArticle } from '$lib/server/blog'

  let { article, locale = 'en-US' }: { article: BlogArticle; locale?: 'en-US' | 'pt-BR' } = $props()
  let pt = $derived(locale === 'pt-BR')
  let titleSuffix = $derived(article.category === 'Review' ? 'ADM' : 'Advanced Digital Marketing LTDA')
  let articleUrl = $derived(`${SITE_ORIGIN}${pt ? '/pt-br' : ''}/blog/${article.slug}/`)
  let tocOpen = $state(false)
  const imageUrl = `${SITE_ORIGIN}/favicon.png`
  let structuredData = $derived(JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    datePublished: article.published,
    dateModified: article.updated,
    inLanguage: locale,
    url: articleUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: 'Andrew Philip Weilbacher',
      url: `${SITE_ORIGIN}/about/`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Advanced Digital Marketing LTDA',
      url: `${SITE_ORIGIN}/`,
      logo: { '@type': 'ImageObject', url: imageUrl },
    },
  }).replace(/</g, '\\u003c'))

  // Blog articles are English-only: keep <html lang> in sync after client-side
  // navigation from a pt-BR page (mirrors LocalizedHead's effect).
  $effect(() => {
    if (browser) document.documentElement.lang = locale
  })
</script>

<svelte:head>
  <title>{article.metaTitle} | {titleSuffix}</title>
  <meta name="description" content={article.description} />
  {#if article.slug === 'paperclip-review-coolify-codex'}
    <link rel="alternate" hreflang="en-US" href={`${SITE_ORIGIN}/blog/${article.slug}/`} />
    <link rel="alternate" hreflang="pt-BR" href={`${SITE_ORIGIN}/pt-br/blog/${article.slug}/`} />
    <link rel="alternate" hreflang="x-default" href={`${SITE_ORIGIN}/blog/${article.slug}/`} />
  {/if}
  <meta property="og:type" content="article" />
  <meta property="og:url" content={articleUrl} />
  <meta property="og:image" content={imageUrl} />
  <meta property="og:image:width" content="1560" />
  <meta property="og:image:height" content="1560" />
  <meta property="og:image:alt" content="Advanced Digital Marketing LTDA logo" />
  <meta property="og:title" content={article.metaTitle} />
  <meta property="og:description" content={article.description} />
  <meta property="article:published_time" content={article.published} />
  <meta property="article:modified_time" content={article.updated} />
  {@html `<script type="application/ld+json">${structuredData}</script>`}
</svelte:head>

<article class="blog-article">
  <header class="blog-article__header">
    <a class="blog-article__back" href={pt ? "/pt-br/blog/" : "/blog/"}>← Blog</a>
    <p class="section-label"><span class="font-jp">記事</span> {pt ? 'Avaliação' : article.category} · {article.published} · {article.readingMinutes} {pt ? 'min de leitura' : 'min read'}</p>
    <h1>{article.title}</h1>
    <p class="blog-article__dek">{article.description}</p>
  </header>

  <div class="article-layout">
  <nav class="article-toc" aria-label={pt ? "Sumário" : "Table of contents"}>
    <strong>{pt ? "Nesta página" : "On this page"}</strong>
    {#each article.headings as heading}
      <a href={`#${heading.id}`}>{heading.text}</a>
    {/each}
  </nav>
  <div class="blog-article__body">
    {@html article.html}
    <section class="article-author" aria-label="About the author">
      <h2>{pt ? 'Sobre o autor' : 'About the author'}</h2>
      <p>{pt ? 'Andrew Philip Weilbacher é fundador da Advanced Digital Marketing LTDA. Trabalha com marketing digital, análise de dados, software e automação.' : 'Andrew Philip Weilbacher is the founder of Advanced Digital Marketing LTDA. He works in digital marketing, analytics, software, and automation.'}</p>
      <a href={pt ? '/pt-br/sobre/' : '/about/'}>{pt ? 'Mais sobre Andrew' : 'More about Andrew'}</a>
    </section>
  </div>
  </div>
  <div class="mobile-toc">
    <button type="button" aria-expanded={tocOpen} onclick={() => tocOpen = !tocOpen}>{pt ? "Sumário" : "Table of contents"} {tocOpen ? '×' : '↑'}</button>
    {#if tocOpen}
      <nav aria-label={pt ? "Sumário" : "Table of contents"}>
        {#each article.headings as heading}
          <a href={`#${heading.id}`} onclick={() => tocOpen = false}>{heading.text}</a>
        {/each}
      </nav>
    {/if}
  </div>
</article>

<style>
  .article-layout { display: grid; grid-template-columns: minmax(12rem, 18rem) minmax(0, 820px); gap: 2rem; max-width: 1200px; margin: auto; padding: 0 1.5rem; }
  .article-toc { position: sticky; align-self: start; top: 6rem; display: flex; flex-direction: column; gap: .6rem; max-height: 65vh; overflow: auto; font-size: .85rem; }
  .article-toc a, .mobile-toc a { display: block; color: inherit; }
  .article-author { margin-top: 4rem; border-top: 1px solid currentColor; }
  .mobile-toc { display: none; }
  @media (max-width: 900px) { .article-layout { display: block; } .article-toc { display: none; } .mobile-toc { display: block; position: fixed; z-index: 30; bottom: 0; right: 1rem; max-width: 90vw; background: #171717; color: white; padding: .75rem; } .mobile-toc nav { display: flex; flex-direction: column; gap: .7rem; max-height: 55vh; overflow: auto; padding: .75rem; } }
</style>
