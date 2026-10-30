<script lang="ts">
  import { browser } from '$app/environment'
  import { SITE_ORIGIN, TRANSLATED_BLOG_SLUGS, BLOG_ARTICLE_COPY, LOCALE_ROUTES, type Locale } from '$lib/locale'
  import { resolveCopy } from '$lib/localized-copy'
  import type { BlogArticle } from '$lib/server/blog'

  let { article, showReadingEstimate = false }: { article: BlogArticle; showReadingEstimate?: boolean } = $props()
  let locale: Locale = $derived(article.locale)
  let copy = $derived(resolveCopy<{review:string;reading:string;readingEstimate:string;contents:string;onPage:string;author:string;bio:string;about:string}>(BLOG_ARTICLE_COPY, locale))
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
  {#if TRANSLATED_BLOG_SLUGS.includes(article.slug)}
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
    <p class="section-label"><span class="font-jp">記事</span> {article.category === 'Review' ? copy.review : article.category} · {article.published}{#if !showReadingEstimate} · {article.readingMinutes} {copy.reading}{/if}</p>
    <h1>{article.title}</h1>
    <p class="blog-article__dek">{article.description}</p>
    {#if showReadingEstimate}
      <p class="blog-article__reading-time">{copy.readingEstimate}: {article.readingMinutes} {copy.reading}</p>
    {/if}
  </header>

  <div class="article-layout">
  <nav class="article-toc" aria-label={copy.contents}>
    <strong>{copy.onPage}</strong>
    {#each article.headings as heading}
      <a href={`#${heading.id}`}>{heading.text}</a>
    {/each}
  </nav>
  <div class="blog-article__body">
    {@html article.html}
    <section class="article-author" aria-label={copy.author}>
      <h2>{copy.author}</h2>
      <p>{copy.bio}</p>
      <a href={LOCALE_ROUTES.about[locale]}>{copy.about}</a>
    </section>
  </div>
  </div>
  <div class="mobile-toc">
    <button type="button" aria-expanded={tocOpen} onclick={() => tocOpen = !tocOpen}>{copy.contents} {tocOpen ? '×' : '↑'}</button>
    {#if tocOpen}
      <nav aria-label={copy.contents}>
        {#each article.headings as heading}
          <a href={`#${heading.id}`} onclick={() => tocOpen = false}>{heading.text}</a>
        {/each}
      </nav>
    {/if}
  </div>
</article>

<style>
  .blog-article__reading-time { margin-top: 1rem; color: var(--ink-muted); }
  .blog-article__body { width: 100%; }
  .blog-article__body :global(h2[id]) { scroll-margin-top: 6rem; }
  /* Benchmark charts retain legible native-size labels on narrow screens. */
  @media (max-width: 900px) {
    .blog-article__body :global(p:has(> img[src="/images/blog/slop-benchmark.svg"])),
    .blog-article__body :global(p:has(> img[src="/images/blog/agentic-video-benchmark.svg"])) { overflow-x: auto; }
    .blog-article__body :global(img[src="/images/blog/slop-benchmark.svg"]),
    .blog-article__body :global(img[src="/images/blog/agentic-video-benchmark.svg"]) { width: 1120px; max-width: none; }
  }

  .article-layout { display: grid; grid-template-columns: minmax(12rem, 18rem) minmax(0, 820px); gap: 2rem; max-width: 1200px; margin: auto; padding: 0 1.5rem 0 max(1.5rem, calc(var(--rail-w) + 1rem)); }
  .article-toc { position: sticky; align-self: start; top: 6rem; display: flex; flex-direction: column; gap: .6rem; max-height: 65vh; overflow: auto; font-size: .85rem; }
  .article-toc a, .mobile-toc a { display: block; color: inherit; }
  .article-author { margin-top: 4rem; border-top: 1px solid currentColor; }
  .mobile-toc { display: none; }
  @media (max-width: 900px) { .article-layout { display: block; } .article-toc { display: none; } .mobile-toc { display: block; position: fixed; z-index: 30; bottom: 0; right: 1rem; max-width: 90vw; background: #171717; color: white; padding: .75rem; } .mobile-toc nav { display: flex; flex-direction: column; gap: .7rem; max-height: 55vh; overflow: auto; padding: .75rem; } }
</style>
