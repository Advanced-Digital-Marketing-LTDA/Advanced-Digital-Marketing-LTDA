import { describe, expect, it } from 'vitest'
import { render } from 'svelte/server'
import { readFileSync } from 'node:fs'
import postcss from 'postcss'
import BlogArticlePage from './BlogArticlePage.svelte'
import { BLOG_ARTICLES } from '$lib/server/blog'

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
      const table = body.match(/<table>[\s\S]*?<\/table>/)?.[0]
      expect(table).toBeDefined()
      const headers = [...table!.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/g)].map((match) => match[1].replace(/[<>]/g, '').trim())
      expect([...table!.matchAll(/<tr\b/g)]).toHaveLength(chart.count + 1)

      const component = readFileSync(new URL('./BlogArticlePage.svelte', import.meta.url), 'utf8')
      const style = component.match(/<style>([\s\S]*?)<\/style>/)?.[1]
      expect(style).toBeDefined()
      const fields = new Map<string, string>()
      postcss.parse(style!).walkAtRules('media', (media) => {
        if (media.params !== '(max-width: 700px)') return
        media.walkRules((rule) => {
          if (!rule.selectors.includes(chart.className)) return
          rule.walkDecls(/^--field-/, (decl) => { fields.set(decl.prop, decl.value.replace(/^"|"$/g, '')) })
        })
      })
      expect(headers.map((_, index) => fields.get(`--field-${index + 1}`))).toEqual(headers)
      const desktopSvg = readAsset(chart.stem)
      const mobileSvg = readAsset(`${chart.stem}-mobile`)
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
