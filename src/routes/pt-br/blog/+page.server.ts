import { PT_BLOG_ARTICLES } from '$lib/server/blog'

export function load() {
  return {
    articles: PT_BLOG_ARTICLES.map(({ slug, title, category, description, published }) => ({ slug, title, category, description, published })),
  }
}
