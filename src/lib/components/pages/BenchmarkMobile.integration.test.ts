import { describe, expect, it } from 'vitest'
import { render } from 'svelte/server'
import { readFileSync } from 'node:fs'
import BlogArticlePage from './BlogArticlePage.svelte'
import { BLOG_ARTICLES } from '$lib/server/blog'

const charts = [
  { slug: 'slop-benchmark-ai-agents', stem: 'slop-benchmark', pareto: 'slop-pareto', className: '.agent-benchmark', count: 24 },
  { slug: 'agentic-video-benchmark', stem: 'agentic-video-benchmark', pareto: 'agentic-video-pareto', className: '.video-benchmark', count: 21 },
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
      // Project sections are restyled and every issue-link paragraph became a list.
      expect(body.match(/<h2 id="[^"]+" class="benchmark-project">/g)).toHaveLength(chart.count)
      expect(body).not.toMatch(/<p>[A-Z][^<:]{0,80}: <a href=/)
      expect(body).not.toContain('<p><a id=')
      const table = body.match(/<table>[\s\S]*?<\/table>/)?.[0]
      expect(table).toBeDefined()
      const headers = [...table!.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/g)].map((match) => match[1].replace(/[<>]/g, '').trim())
      expect(headers).toHaveLength(chart.slug === 'agentic-video-benchmark' ? 13 : 11)
      const rows = [...table!.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)].slice(1)
      expect(rows).toHaveLength(chart.count)
      const cells = rows.map((row) => [...row[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/g)].map((cell) => cell[1].trim()))
      for (const row of cells) expect(row).toHaveLength(headers.length)

      // Every cell carries its column name so the mobile card can label it.
      const labels = rows.map((row) => [...row[1].matchAll(/<td\b[^>]*data-label="([^"]*)"/g)].map((match) => match[1]))
      for (const rowLabels of labels) expect(rowLabels).toEqual(headers)
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

    it(`serves ${chart.slug} Stars vs. Slop chart with a mobile version`, () => {
      const article = BLOG_ARTICLES.find((item) => item.slug === chart.slug)
      expect(article).toBeDefined()
      const { body } = render(BlogArticlePage, { props: { article: article! } })
      expect(body).toContain(`srcset="/images/blog/${chart.pareto}-mobile.svg"`)
      expect(body).toContain(`src="/images/blog/${chart.pareto}.svg"`)
      const desktopPoints = readAsset(chart.pareto).match(/<circle [^>]*r="6.5"/g)
      const mobilePoints = readAsset(`${chart.pareto}-mobile`).match(/<circle [^>]*r="5"/g)
      // Every repository is one plotted point; two more circles per version are legend keys.
      expect(desktopPoints).toHaveLength(chart.count + 2)
      expect(mobilePoints).toHaveLength(chart.count + 2)
    })
  }
})
