import { describe, expect, it } from 'vitest'
import { render } from 'svelte/server'
import BlogArticlePage from './BlogArticlePage.svelte'
import { PT_BLOG_ARTICLES } from '$lib/server/blog'

const benchmarks = [
  { slug: 'slop-benchmark-ai-agents', className: 'agent-benchmark', count: 24, columns: 11 },
  { slug: 'agentic-video-benchmark', className: 'video-benchmark', count: 21, columns: 13 },
]

describe('Portuguese benchmark presentation', () => {
  for (const benchmark of benchmarks) {
    it(`gives the pt-BR ${benchmark.slug} the benchmark layout without changing its text`, () => {
      const article = PT_BLOG_ARTICLES.find((item) => item.slug === benchmark.slug)
      expect(article).toBeDefined()
      const { body } = render(BlogArticlePage, { props: { article: article! } })
      const bodyClass = body.match(/<div class="([^"]*\bblog-article__body\b[^"]*)"/)?.[1].split(/\s+/) ?? []
      expect(bodyClass).toEqual(expect.arrayContaining(['benchmark', benchmark.className]))

      // Project headings keep the Portuguese word order inside the score badge.
      const headings = [...body.matchAll(/<h2 id="[^"]+" class="benchmark-project">([\s\S]*?)<\/h2>/g)].map((match) => match[1])
      expect(headings).toHaveLength(benchmark.count)
      for (const heading of headings) {
        expect(heading).toMatch(/<span class="benchmark-project__score">Slop Log Score de <span class="benchmark-project__value">\d+\.\d{4}<\/span><\/span>$/)
        expect(heading.replace(/<[^>]+>/g, '')).toMatch(/^.+: Slop Log Score de \d+\.\d{4}$/)
      }
      expect(body).not.toMatch(/<p>[A-Z][^<:]{0,80}: <a href=/)

      // Every cell carries its Portuguese column name so the mobile card can label it.
      const table = body.match(/<div class="benchmark-table"[^>]*><table>[\s\S]*?<\/table><\/div>/)?.[0]
      expect(table).toBeDefined()
      const headers = [...table!.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/g)].map((match) => match[1].trim())
      expect(headers).toHaveLength(benchmark.columns)
      expect(headers).toContain('Projeto')
      const rows = [...table!.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)].slice(1)
      expect(rows).toHaveLength(benchmark.count)
      for (const row of rows) {
        expect([...row[1].matchAll(/<td\b[^>]*data-label="([^"]*)"/g)].map((match) => match[1])).toEqual(headers)
        expect(row[1]).toMatch(/<td\b[^>]* class="benchmark-cell benchmark-cell--name" data-label="Projeto">/)
        expect(row[1].match(/benchmark-cell--stat/g)).toHaveLength(4)
      }
    })
  }
})
