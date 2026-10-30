import { describe, expect, it } from 'vitest'
import { render } from 'svelte/server'
import { readFileSync } from 'node:fs'
import postcss from 'postcss'
import BlogArticlePage from './BlogArticlePage.svelte'
import { BLOG_ARTICLES } from '$lib/server/blog'

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
    const component = readFileSync(new URL('./BlogArticlePage.svelte', import.meta.url), 'utf8')
    const style = component.match(/<style>([\s\S]*?)<\/style>/)?.[1]
    expect(style).toBeDefined()
    const css = postcss.parse(style!)
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
