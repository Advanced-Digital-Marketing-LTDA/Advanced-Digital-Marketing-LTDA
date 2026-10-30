import { describe, expect, it } from 'vitest'
import { render } from 'svelte/server'
import BlogArticlePage from './BlogArticlePage.svelte'
import { BLOG_ARTICLES } from '$lib/server/blog'
import { readBlogArticleStyle } from './blogArticleTestStyle'

// Every blog article title shares the narrow-screen wrapping rule.
describe('blog article headings', () => {
  it('renders one title heading for each article', () => {
    for (const article of BLOG_ARTICLES) {
      const { body } = render(BlogArticlePage, { props: { article } })
      const header = body.match(/<header\b[\s\S]*?<\/header>/)?.[0]
      expect(header, article.slug).toBeDefined()
      expect(header?.match(/<h1\b[^>]*>/g), article.slug).toHaveLength(1)
    }
  })

  it('allows article headings to wrap on narrow screens', () => {
    const css = readBlogArticleStyle()
    let ruleFound = false
    css.walkAtRules('media', (media) => {
      if (media.params !== '(max-width: 900px)') return
      media.walkRules('.blog-article__header h1', (rule) => {
        rule.walkDecls('overflow-wrap', (decl) => { ruleFound ||= decl.value === 'anywhere' })
      })
    })
    expect(ruleFound, 'article headings must allow wrapping at widths up to 900px').toBe(true)
  })
})
