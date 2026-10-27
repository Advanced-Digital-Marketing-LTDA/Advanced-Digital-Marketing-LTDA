/**
 * Blog content pipeline — SERVER/BUILD ONLY (lives in $lib/server so SvelteKit
 * rejects any client import). Keeping the raw Markdown and `marked` here means
 * blog visitors never download the article source or the parser; the routes
 * receive the rendered result through their `+page.server.ts` loaders.
 */
import { marked } from 'marked'
import type { Locale } from '$lib/locale'
import articleMarkdown from '../../../docs/ChatGPT-Ads-Complete-Guide-August-2026.md?raw'
import paperclipMarkdown from '../../../docs/Paperclip-Review-Coolify-Codex-2026.md?raw'
import openclawMarkdown from '../../../docs/OpenClaw-Review-Coolify-Codex-2026.md?raw'
import slopBenchmarkMarkdown from '../../../docs/Slop-Benchmark-AI-Agents-2026.md?raw'
import paperclipPortuguese from '$lib/content/paperclip-review-pt-br.md?raw'

export type BlogArticle = {
  slug: string
  locale: Locale
  title: string
  category: 'Guide' | 'Review'
  metaTitle: string
  description: string
  published: string
  updated: string
  html: string
  readingMinutes: number
  headings: { id: string; text: string }[]
}

/** Splits the YAML frontmatter block off the article body, parsing `key: value`
 *  scalars (quoted or bare). Unknown keys are ignored. */
function splitFrontmatter(markdown: string): { fields: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(markdown)
  if (!match) throw new Error('Blog article is missing its frontmatter')
  const fields: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const kv = /^([a-z_]+):\s*(.+)$/.exec(line)
    if (kv) fields[kv[1]] = kv[2].trim().replace(/^"(.*)"$/, '$1')
  }
  return { fields, body: markdown.slice(match[0].length) }
}

/** Frontmatter is the single source of truth for article metadata — a missing
 *  key must break the build rather than ship an empty <title> or og tag. */
function requiredField(fields: Record<string, string>, key: string): string {
  const value = fields[key]
  if (!value) throw new Error(`Blog article frontmatter is missing '${key}'`)
  return value
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

function requiredDate(fields: Record<string, string>, key: string): string {
  const value = requiredField(fields, key)
  if (!ISO_DATE.test(value)) throw new Error(`Blog article frontmatter '${key}' must be YYYY-MM-DD (got '${value}')`)
  return value
}

function publicArticleMarkdown(markdown: string): string {
  const appendixMarker = '\n## Publishing Appendix:'
  const appendixStart = markdown.indexOf(appendixMarker)
  // Fail closed: a renamed or missing appendix heading must break the build,
  // not silently publish the internal publishing notes.
  if (appendixStart === -1) throw new Error("Blog article is missing its '## Publishing Appendix:' marker")
  let body = markdown.slice(0, appendixStart).trimEnd()
  // Strip the thematic break that separated the article from the appendix so
  // the public page does not end with an empty divider.
  if (body.endsWith('---')) body = body.slice(0, -3).trimEnd()
  return `${body}\n`
}

export function uniqueHeadingId(text: string, used: Set<string>): string {
  const base = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  if (!base) throw new Error(`Heading cannot produce an anchor ID: ${text}`)
  let id = base
  let suffix = 2
  while (used.has(id)) id = `${base}-${suffix++}`
  used.add(id)
  return id
}

function createArticle(
  markdown: string,
  slug: string,
  category: BlogArticle['category'],
  hasPublishingAppendix: boolean,
  locale: Locale,
): BlogArticle {
  const { fields, body } = splitFrontmatter(markdown)
  const content = hasPublishingAppendix ? publicArticleMarkdown(body) : body
  const headings: { id: string; text: string }[] = []
  const usedIds = new Set<string>()
  const renderer = new marked.Renderer()
  renderer.heading = function ({ tokens, depth }) {
    const html = this.parser.parseInline(tokens)
    if (depth !== 2) return `<h${depth}>${html}</h${depth}>\n`
    const text = this.parser.parseInline(tokens, new marked.TextRenderer()).replaceAll('<', '').replaceAll('>', '').replaceAll('&amp;', '&')
    const id = uniqueHeadingId(text, usedIds)
    headings.push({ id, text })
    return `<h2 id="${id}">${html}</h2>\n`
  }
  const readingMinutes = Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200))
  const renderedArticle = marked.parse(content, { async: false, gfm: true, renderer })
  if (typeof renderedArticle !== 'string') throw new Error('Blog article rendering must be synchronous')

  return {
    slug,
    locale,
    category,
    title: requiredField(fields, 'title'),
    metaTitle: requiredField(fields, 'meta_title'),
    description: requiredField(fields, 'meta_description'),
    published: requiredDate(fields, 'published'),
    updated: requiredDate(fields, 'updated'),
    html: renderedArticle,
    readingMinutes,
    headings,
  }
}

export const CHATGPT_ADS_ARTICLE = createArticle(
  articleMarkdown, 'chatgpt-ads-complete-guide-august-2026', 'Guide', true, 'en-US',
)

export const PAPERCLIP_REVIEW_ARTICLE = createArticle(
  paperclipMarkdown, 'paperclip-review-coolify-codex', 'Review', false, 'en-US',
)

export const OPENCLAW_REVIEW_ARTICLE = createArticle(
  openclawMarkdown, 'openclaw-review-coolify-codex', 'Review', false, 'en-US',
)

export const SLOP_BENCHMARK_ARTICLE = createArticle(
  slopBenchmarkMarkdown, 'slop-benchmark-ai-agents', 'Review', false, 'en-US',
)

export const BLOG_ARTICLES: readonly BlogArticle[] = [SLOP_BENCHMARK_ARTICLE, OPENCLAW_REVIEW_ARTICLE, PAPERCLIP_REVIEW_ARTICLE, CHATGPT_ADS_ARTICLE]

export const PAPERCLIP_REVIEW_PT = createArticle(
  paperclipPortuguese, 'paperclip-review-coolify-codex', 'Review', false, 'pt-BR',
)
