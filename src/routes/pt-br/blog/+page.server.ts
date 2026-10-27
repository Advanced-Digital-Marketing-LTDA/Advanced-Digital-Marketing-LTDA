import { PAPERCLIP_REVIEW_PT } from '$lib/server/blog'

export function load() {
  const { slug, title, description, published } = PAPERCLIP_REVIEW_PT
  return { articles: [{ slug, title, description, published }] }
}
