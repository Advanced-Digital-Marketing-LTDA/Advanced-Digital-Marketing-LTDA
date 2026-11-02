import { describe, expect, it } from 'vitest'
import { render } from 'svelte/server'
import BlogArticlePage from './BlogArticlePage.svelte'
import BlogIndex from './BlogIndex.svelte'
import { BLOG_ARTICLES, PT_BLOG_ARTICLES } from '$lib/server/blog'

const guideSlug = 'chatgpt-ads-complete-guide-august-2026'

describe('guide category label', () => {
  it('reads "Guia" on Portuguese pages and "Guide" on English ones', () => {
    for (const [articles, label, other] of [[PT_BLOG_ARTICLES, 'Guia', 'Guide'], [BLOG_ARTICLES, 'Guide', 'Guia']] as const) {
      const guide = articles.find((article) => article.slug === guideSlug)
      expect(guide?.category).toBe('Guide')
      const header = render(BlogArticlePage, { props: { article: guide! } }).body.match(/<header class="blog-article__header[^"]*">[\s\S]*?<\/header>/)?.[0]
      expect(header).toContain(` ${label} · `)
      expect(header).not.toContain(` ${other} · `)
      const locale = guide!.locale
      const cards = render(BlogIndex, { props: { articles: [...articles], locale } }).body
      expect(cards).toContain(`<span>${label}</span>`)
      expect(cards).not.toContain(`<span>${other}</span>`)
    }
  })
})
