<script lang="ts">
  import { browser } from '$app/environment'
  import { SITE_ORIGIN, TRANSLATED_BLOG_SLUGS, BLOG_ARTICLE_COPY, LOCALE_ROUTES, type Locale } from '$lib/locale'
  import { resolveCopy } from '$lib/localized-copy'
  import type { BlogArticle } from '$lib/server/blog'
  import { formatBenchmarkHtml, groupContents, isBenchmarkArticle } from './benchmarkArticle'

  let { article, showReadingEstimate = false }: { article: BlogArticle; showReadingEstimate?: boolean } = $props()
  // Keep the original graphic on larger screens and offer a readable, narrow
  // version without changing the article's accessible image description.
  let benchmark = $derived(isBenchmarkArticle(article.headings))
  let articleHtml = $derived.by(() => {
    const html = article.html.replace(
      /<img src="(\/images\/blog\/(?:slop-benchmark|agentic-video-benchmark|slop-pareto|agentic-video-pareto))\.svg"[^>]*>/g,
      (image, stem: string) => `<picture><source media="(max-width: 700px)" srcset="${stem}-mobile.svg">${image}</picture>`,
    )
    return benchmark ? formatBenchmarkHtml(html) : html
  })
  let contents = $derived(groupContents(article.headings, benchmark))
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
    {@render contentsLinks()}
  </nav>
  <div class="blog-article__body" class:benchmark class:video-benchmark={article.slug === 'agentic-video-benchmark'} class:agent-benchmark={article.slug === 'slop-benchmark-ai-agents'}>
    {@html articleHtml}
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
        {@render contentsLinks(() => tocOpen = false)}
      </nav>
    {/if}
  </div>
</article>

{#snippet contentsLinks(onnavigate?: () => void)}
  {#each contents as entry}
    {#if entry.kind === 'link'}
      <a href={`#${entry.link.id}`} onclick={onnavigate}>{entry.link.text}</a>
    {:else}
      <details class="toc-projects">
        <summary>{pt ? 'Projetos' : 'Projects'} ({entry.links.length})</summary>
        {#each entry.links as link}
          <a href={`#${link.id}`} onclick={onnavigate}>{link.text}</a>
        {/each}
      </details>
    {/if}
  {/each}
{/snippet}

<style>
  .blog-article__reading-time { margin-top: 1rem; color: var(--ink-muted); }
  .blog-article__body { width: 100%; }
  .blog-article__body :global(h2[id]) { scroll-margin-top: 6rem; }
  @media (max-width: 900px) {
    .blog-article__header h1 { overflow-wrap: anywhere; }
    /* Benchmark charts retain legible native-size labels on narrow screens. */
    .blog-article__body :global(p:has(> picture > img[src="/images/blog/slop-benchmark.svg"])),
    .blog-article__body :global(p:has(> picture > img[src="/images/blog/agentic-video-benchmark.svg"])) { overflow-x: auto; }
    .blog-article__body :global(img[src="/images/blog/slop-benchmark.svg"]),
    .blog-article__body :global(img[src="/images/blog/agentic-video-benchmark.svg"]) { width: 1120px; max-width: none; }
  }
  /* Stars vs. Slop charts: the wide version scrolls between 701 and 900px; the mobile version fits its column. */
  @media (min-width: 701px) and (max-width: 900px) {
    .blog-article__body :global(p:has(> picture > img[src="/images/blog/slop-pareto.svg"])),
    .blog-article__body :global(p:has(> picture > img[src="/images/blog/agentic-video-pareto.svg"])) { overflow-x: auto; }
    .blog-article__body :global(img[src="/images/blog/slop-pareto.svg"]),
    .blog-article__body :global(img[src="/images/blog/agentic-video-pareto.svg"]) { width: 1120px; max-width: none; }
  }

  .article-layout { display: grid; grid-template-columns: minmax(12rem, 18rem) minmax(0, 820px); gap: 2rem; max-width: 1200px; margin: 0; padding: 0 1.5rem 0 max(1.5rem, calc(var(--rail-w) + 1rem)); }
  /* Slop Benchmark articles: a wide, pinned data table, compact project
     sections and mobile summary cards. Wording and numbers come unchanged
     from the article; benchmarkArticle.ts only adds structure and classes. */
  .benchmark { --benchmark-breakout: 0px; }
  @media (min-width: 1240px) { .benchmark { --benchmark-breakout: min(20rem, 100vw - 1224px); } }
  .benchmark :global(.benchmark-anchor) { display: block; scroll-margin-top: 6rem; }
  .benchmark :global(.benchmark-table) { width: calc(100% + var(--benchmark-breakout)); max-height: min(80vh, 48rem); margin: 2rem 0 2.5rem; overflow: auto; border: 1px solid var(--ink-faint); background: var(--paper); }
  .benchmark :global(.benchmark-table:focus-visible) { outline: 2px solid var(--verm); outline-offset: 3px; }
  .benchmark :global(.benchmark-table table) { display: table; width: 100%; margin: 0; white-space: normal; font-size: .84rem; font-variant-numeric: tabular-nums; }
  .benchmark :global(.benchmark-table th) { position: sticky; top: 0; z-index: 2; min-width: 0; padding: .75rem .6rem; border-bottom: 1px solid var(--ink); background: var(--paper); font-size: .64rem; line-height: 1.3; vertical-align: bottom; }
  .benchmark :global(.benchmark-table td) { min-width: 0; padding: .6rem; background: var(--paper); vertical-align: middle; }
  .benchmark :global(.benchmark-table tbody tr:nth-child(even) td) { background: #ebe7e0; }
  .benchmark :global(.benchmark-table tbody tr:hover td) { background: #e3ded5; }
  .benchmark :global(.benchmark-cell--stat), .benchmark :global(.benchmark-cell--meta), .benchmark :global(.benchmark-cell--score) { text-align: right; white-space: nowrap; }
  .benchmark :global(.benchmark-table .benchmark-cell--name) { position: sticky; left: 0; z-index: 1; min-width: 11rem; box-shadow: inset -1px 0 0 var(--ink-faint); }
  .benchmark :global(.benchmark-table .benchmark-cell--score) { position: sticky; right: 0; z-index: 1; box-shadow: inset 1px 0 0 var(--ink-faint); }
  .benchmark :global(.benchmark-table th.benchmark-cell--name), .benchmark :global(.benchmark-table th.benchmark-cell--score) { z-index: 3; }
  .benchmark :global(.benchmark-table td.benchmark-cell--category) { min-width: 8.5rem; color: var(--ink-muted); }
  .benchmark :global(td.benchmark-cell--score) { color: var(--verm-deep); font-weight: 700; }
  .benchmark :global(h2.benchmark-project) { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: .6rem 1rem; margin: 4rem 0 1.1rem; padding-top: 1.4rem; border-top: 1px solid var(--ink); font-family: 'ADM Semi', sans-serif; font-size: clamp(1.3rem, 2.2vw, 1.7rem); letter-spacing: -.01em; line-height: 1.2; text-transform: none; }
  .benchmark :global(.benchmark-project__name) { min-width: 0; overflow-wrap: anywhere; }
  .benchmark :global(.benchmark-project__sep) { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  .benchmark :global(.benchmark-project__score) { display: inline-flex; align-items: baseline; gap: .45rem; padding: .35rem .7rem; background: var(--verm-deep); color: var(--paper); font-family: 'JetBrains Mono', monospace; font-size: .66rem; letter-spacing: .08em; text-transform: uppercase; white-space: nowrap; }
  .benchmark :global(.benchmark-project__value) { font-size: 1rem; font-weight: 700; letter-spacing: 0; }
  .benchmark :global(.benchmark-threads__label) { margin: 1.6rem 0 .35rem; color: var(--ink-muted); font-family: 'ADM Semi', sans-serif; font-size: .72rem; letter-spacing: .1em; text-transform: uppercase; }
  .benchmark :global(ul.benchmark-threads) { max-width: 72ch; margin: 0 0 1.75rem; padding: 0; border-top: 1px solid var(--ink-faint); list-style: none; }
  .benchmark :global(.benchmark-threads li) { position: relative; margin: 0; padding: .65rem 0 .65rem 1.5rem; border-bottom: 1px solid var(--ink-faint); line-height: 1.5; }
  .benchmark :global(.benchmark-threads li::before) { position: absolute; left: 0; color: var(--verm-deep); content: '↗' / ''; }
  @media (min-width: 901px) {
    .benchmark :global(p:has(> picture)) { width: calc(100% + var(--benchmark-breakout)); max-width: none; }
    .benchmark :global(picture img) { display: block; width: 100%; height: auto; border: 1px solid var(--ink-faint); }
  }
  @media (max-width: 700px) {
    .benchmark :global(.benchmark-table) { width: 100%; max-height: none; overflow: visible; border: 0; background: none; }
    .benchmark :global(.benchmark-table table) { display: block; font-size: .9rem; }
    .benchmark :global(.benchmark-table thead) { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
    .benchmark :global(.benchmark-table tbody) { display: grid; gap: .9rem; }
    .benchmark :global(.benchmark-table tr) { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .6rem .5rem; padding: .85rem .9rem; border: 1px solid var(--ink-faint); background: var(--paper); }
    .benchmark :global(.benchmark-table td),
    .benchmark :global(.benchmark-table tbody tr:nth-child(even) td),
    .benchmark :global(.benchmark-table tbody tr:hover td) { display: block; position: static; min-width: 0; padding: 0; border: 0; background: none; box-shadow: none; text-align: left; white-space: normal; }
    .benchmark :global(.benchmark-table td.benchmark-cell--name) { position: static; min-width: 0; box-shadow: none; grid-column: 1 / 4; order: 0; align-self: center; font-weight: 700; overflow-wrap: anywhere; }
    .benchmark :global(.benchmark-table td.benchmark-cell--score) { position: static; box-shadow: none; grid-column: 4; order: 1; justify-self: end; align-self: start; padding: .2rem .45rem; background: var(--verm-deep); color: var(--paper); font-family: 'JetBrains Mono', monospace; text-align: right; }
    .benchmark :global(.benchmark-table td.benchmark-cell--category) { min-width: 0; grid-column: 1 / -1; order: 2; margin-top: -.35rem; font-size: .8rem; }
    .benchmark :global(td.benchmark-cell--stat) { order: 3; padding-top: .55rem; border-top: 1px solid var(--ink-faint); font-weight: 600; }
    .benchmark :global(td.benchmark-cell--meta) { order: 4; color: var(--ink-muted); font-size: .78rem; }
    .benchmark :global(td.benchmark-cell--stat::before), .benchmark :global(td.benchmark-cell--meta::before), .benchmark :global(td.benchmark-cell--score::before) { display: block; color: var(--ink-muted); content: attr(data-label); font-family: 'ADM Semi', sans-serif; font-size: .6rem; font-weight: 400; letter-spacing: .06em; line-height: 1.25; text-transform: uppercase; }
    .benchmark :global(td.benchmark-cell--score::before) { color: var(--paper); font-size: .5rem; }
    .benchmark :global(h2.benchmark-project) { margin-top: 3rem; }
    .blog-article__body :global(img[src="/images/blog/slop-benchmark.svg"]),
    .blog-article__body :global(img[src="/images/blog/agentic-video-benchmark.svg"]) { width: 100%; max-width: 26rem; height: auto; border: 1px solid var(--ink-faint); }
  }
  .article-toc { position: sticky; align-self: start; top: 6rem; display: flex; flex-direction: column; gap: .6rem; max-height: 65vh; overflow: auto; font-size: .85rem; }
  .article-toc a, .mobile-toc a { display: block; color: inherit; }
  .toc-projects summary { cursor: pointer; font-weight: 700; }
  .toc-projects a { margin-top: .55rem; padding-left: .9rem; }
  .article-author { margin-top: 4rem; border-top: 1px solid currentColor; }
  .mobile-toc { display: none; }
  @media (max-width: 900px) { .article-layout { display: block; } .article-toc { display: none; } .mobile-toc { display: block; position: fixed; z-index: 30; bottom: 0; right: 1rem; box-sizing: border-box; max-width: min(90vw, calc(100vw - var(--rail-w) - 2rem)); overflow-wrap: anywhere; background: #171717; color: white; padding: .75rem; } .mobile-toc nav { display: flex; flex-direction: column; gap: .7rem; max-height: 55vh; overflow: auto; padding: .75rem; } }
</style>
