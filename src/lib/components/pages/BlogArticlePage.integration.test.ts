import { describe, expect, it } from 'vitest'
import { render } from 'svelte/server'
import { readFileSync } from 'node:fs'
import postcss from 'postcss'
import BlogArticlePage from './BlogArticlePage.svelte'
import { BLOG_ARTICLES } from '$lib/server/blog'

// The long benchmark titles need a narrow-screen wrapping rule; unrelated
// article headers retain their existing styling.
describe('benchmark article headings', () => {
  it('marks only the two benchmark headings for responsive wrapping', () => {
    const benchmarks = ['slop-benchmark-ai-agents', 'agentic-video-benchmark']
    for (const article of BLOG_ARTICLES) {
      const { body } = render(BlogArticlePage, { props: { article } })
      const heading = body.match(/<h1\b[^>]*>/)?.[0]
      expect(heading, article.slug).toBeDefined()
      const classes = heading?.match(/\bclass="([^"]*)"/)?.[1].split(/\s+/) ?? []
      expect(classes.includes('benchmark-title'), article.slug).toBe(benchmarks.includes(article.slug))
    }
    expect(BLOG_ARTICLES.filter((article) => benchmarks.includes(article.slug))).toHaveLength(2)
  })

  it('allows marked headings to wrap on narrow screens', () => {
    const component = readFileSync(new URL('./BlogArticlePage.svelte', import.meta.url), 'utf8')
    const style = component.match(/<style>([\s\S]*?)<\/style>/)?.[1]
    expect(style).toBeDefined()
    const css = postcss.parse(style!)
    let ruleFound = false
    css.walkAtRules('media', (media) => {
      if (media.params !== '(max-width: 900px)') return
      media.walkRules('.benchmark-title', (rule) => {
        rule.walkDecls('overflow-wrap', (decl) => { ruleFound ||= decl.value === 'anywhere' })
      })
    })
    expect(ruleFound, 'benchmark headings must allow wrapping at widths up to 900px').toBe(true)
  })
})
