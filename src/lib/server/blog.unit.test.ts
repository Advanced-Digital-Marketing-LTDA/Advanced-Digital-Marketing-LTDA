import { describe, expect, it } from 'vitest'
import { TRANSLATED_BLOG_SLUGS } from '$lib/locale'
import { BLOG_ARTICLES, PT_BLOG_ARTICLES, uniqueHeadingId } from './blog'

describe('blog rendering', () => {
  it('does not collide with headings whose base already includes a suffix', () => {
    const used = new Set<string>()
    expect(['A', 'A', 'A-2'].map((heading) => uniqueHeadingId(heading, used))).toEqual(['a', 'a-2', 'a-2-2'])
  })

  it('provides heading navigation and reading time', () => {
    for (const article of [...PT_BLOG_ARTICLES, ...BLOG_ARTICLES]) {
      expect(article.readingMinutes).toBeGreaterThan(0)
      expect(article.headings.length).toBeGreaterThan(0)
      for (const heading of article.headings) expect(article.html).toContain(`id="${heading.id}"`)
      expect(new Set(article.headings.map((heading) => heading.id)).size).toBe(article.headings.length)
    }
  })

  it('does not expose frontmatter or the internal publishing appendix', () => {
    for (const article of [...PT_BLOG_ARTICLES, ...BLOG_ARTICLES]) {
      expect(article.html).not.toContain('meta_description')
      expect(article.html).not.toContain('primary_entity')
      expect(article.html).not.toContain('Publishing Appendix')
      expect(article.html.trimEnd()).not.toMatch(/<hr\s*\/?>$/)
    }
  })

  it('pairs every Portuguese article with its full English original', () => {
    expect(PT_BLOG_ARTICLES.map((article) => article.slug).sort((a, b) => a.localeCompare(b)))
      .toEqual([...TRANSLATED_BLOG_SLUGS].sort((a, b) => a.localeCompare(b)))
    for (const portuguese of PT_BLOG_ARTICLES) {
      const english = BLOG_ARTICLES.find((article) => article.slug === portuguese.slug)
      expect(english, portuguese.slug).toBeDefined()
      expect(portuguese.locale).toBe('pt-BR')
      expect(portuguese.category).toBe(english!.category)
      expect(portuguese.published).toEqual(english!.published)
      expect(portuguese.headings.length, portuguese.slug).toBe(english!.headings.length)
    }
  })
})
