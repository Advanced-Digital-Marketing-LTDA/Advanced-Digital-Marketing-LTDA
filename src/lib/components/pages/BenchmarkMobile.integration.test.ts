import { describe, expect, it } from 'vitest'
import { render } from 'svelte/server'
import { readFileSync } from 'node:fs'
import BlogArticlePage from './BlogArticlePage.svelte'
import { BLOG_ARTICLES } from '$lib/server/blog'
import { readBlogArticleStyle } from './blogArticleTestStyle'

const charts = [
  { slug: 'slop-benchmark-ai-agents', stem: 'slop-benchmark', className: '.agent-benchmark', count: 24 },
  { slug: 'agentic-video-benchmark', stem: 'agentic-video-benchmark', className: '.video-benchmark', count: 38 },
]

function readAsset(stem: string): string {
  return readFileSync(new URL(`../../../../static/images/blog/${stem}.svg`, import.meta.url), 'utf8')
}

function scores(svg: string): string[] {
  return [...svg.matchAll(/>(\d+\.\d{4})<\/text>/g)].map((match) => match[1])
}

describe('mobile benchmark presentation', () => {
  for (const chart of charts) {
    it(`preserves ${chart.slug} scores and column labels`, () => {
      const article = BLOG_ARTICLES.find((item) => item.slug === chart.slug)
      expect(article).toBeDefined()
      const { body } = render(BlogArticlePage, { props: { article: article! } })
      expect(body).toContain(`srcset="/images/blog/${chart.stem}-mobile.svg"`)
      const bodyClass = body.match(/<div class="([^"]*\bblog-article__body\b[^"]*)"/)?.[1].split(/\s+/) ?? []
      expect(bodyClass).toContain(chart.className.slice(1))
      const table = body.match(/<table>[\s\S]*?<\/table>/)?.[0]
      expect(table).toBeDefined()
      const headers = [...table!.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/g)].map((match) => match[1].replace(/[<>]/g, '').trim())
      expect(headers).toHaveLength(chart.slug === 'agentic-video-benchmark' ? 13 : 11)
      const rows = [...table!.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)].slice(1)
      expect(rows).toHaveLength(chart.count)
      const cells = rows.map((row) => [...row[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/g)].map((cell) => cell[1].trim()))
      for (const row of cells) expect(row).toHaveLength(headers.length)

      const fields = new Map<string, string>()
      readBlogArticleStyle().walkAtRules('media', (media) => {
        if (media.params !== '(max-width: 700px)') return
        media.walkRules((rule) => {
          if (!rule.selectors.includes(chart.className)) return
          rule.walkDecls(/^--field-/, (decl) => { fields.set(decl.prop, decl.value.replace(/^"|"$/g, '')) })
        })
      })
      expect(headers.map((_, index) => fields.get(`--field-${index + 1}`))).toEqual(headers)
      const desktopSvg = readAsset(chart.stem)
      const mobileSvg = readAsset(`${chart.stem}-mobile`)
      const scoreIndex = headers.indexOf('Slop Log Score')
      expect(scoreIndex).toBeGreaterThanOrEqual(0)
      expect(cells.map((row) => row[scoreIndex])).toEqual(scores(desktopSvg))
      expect(scores(mobileSvg)).toEqual(scores(desktopSvg))
      expect(scores(mobileSvg)).toHaveLength(chart.count)
      const desktopNames = [...desktopSvg.matchAll(/<text x="32" y="(\d+)" font-size="15">([^<]*)<\/text>/g)]
        .filter((match) => Number(match[1]) >= 140).map((match) => match[2])
      const mobileParts = [...mobileSvg.matchAll(/<text x="10" y="(\d+)" font-size="(?:9|11)"[^>]*>([^<]*)<\/text>/g)]
        .filter((match) => Number(match[1]) >= 95).map((match) => match[2])
      const mobileNames = Array.from({ length: mobileParts.length / 2 }, (_, index) => {
        const owner = mobileParts[index * 2]
        return owner ? `${owner.slice(0, -2)}/${mobileParts[index * 2 + 1]}` : mobileParts[index * 2 + 1]
      })
      expect(mobileNames).toEqual(desktopNames)
    })
  }
})
