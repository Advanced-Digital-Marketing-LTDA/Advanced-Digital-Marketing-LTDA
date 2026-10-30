import { readFileSync } from 'node:fs'
import postcss from 'postcss'

export function readBlogArticleStyle() {
  const component = readFileSync(new URL('./BlogArticlePage.svelte', import.meta.url), 'utf8')
  const style = component.match(/<style>([\s\S]*?)<\/style>/)?.[1]
  if (!style) throw new Error('Blog article component is missing its style block')
  return postcss.parse(style)
}
