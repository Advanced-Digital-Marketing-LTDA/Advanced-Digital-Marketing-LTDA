<script lang="ts">
  import { browser } from '$app/environment'
  import { SITE_ORIGIN } from '$lib/locale'
  import type { BlogArticle } from '$lib/server/blog'

  let { article }: { article: BlogArticle } = $props()
  let titleSuffix = $derived(article.category === 'Review' ? 'ADM' : 'Advanced Digital Marketing LTDA')
  let articleUrl = $derived(`${SITE_ORIGIN}/blog/${article.slug}/`)
  const imageUrl = `${SITE_ORIGIN}/favicon.png`
  let structuredData = $derived(JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    datePublished: article.published,
    dateModified: article.updated,
    inLanguage: 'en-US',
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
    if (browser) document.documentElement.lang = 'en-US'
  })
</script>

<svelte:head>
  <title>{article.metaTitle} | {titleSuffix}</title>
  <meta name="description" content={article.description} />
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
    <a class="blog-article__back" href="/blog/">← Blog</a>
    <p class="section-label"><span class="font-jp">記事</span> {article.category} · {article.published}</p>
    <h1>{article.title}</h1>
    <p class="blog-article__dek">{article.description}</p>
  </header>

  <div class="blog-article__body">
    {@html article.html}
  </div>
</article>
