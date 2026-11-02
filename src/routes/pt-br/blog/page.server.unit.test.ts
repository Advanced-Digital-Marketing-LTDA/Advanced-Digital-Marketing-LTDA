import { describe, expect, it } from 'vitest'
import { PT_BLOG_ARTICLES } from '$lib/server/blog'
import { load } from './+page.server'

describe('Portuguese blog index load', () => {
  it('keeps each article category so guides render as guides', () => {
    const { articles } = load()
    expect(articles.map((article) => article.category)).toEqual(PT_BLOG_ARTICLES.map((article) => article.category))
    expect(articles.some((article) => article.category === 'Guide')).toBe(true)
  })
})
