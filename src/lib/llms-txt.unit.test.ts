import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { SITE_ORIGIN } from './locale'

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8')
const sitemapUrls = new Set([...read('../../static/sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]))
const llms = read('../../static/llms.txt')
const linkTargets = (text: string) => [...text.matchAll(/\]\(([^)\s]+)\)/g)].map((match) => match[1])
const [englishPart, portuguesePart] = llms.split(/^## Português \(pt-BR\)$/m)
const llmsUrls = linkTargets(llms)

describe('static/llms.txt', () => {
  it('links only canonical sitemap pages on this site', () => {
    expect(llmsUrls.length).toBeGreaterThan(0)
    for (const url of llmsUrls) {
      expect(url.startsWith(SITE_ORIGIN), url).toBe(true)
      expect(sitemapUrls.has(url), url).toBe(true)
    }
  })

  it('links every sitemap page', () => {
    expect(new Set(llmsUrls)).toEqual(sitemapUrls)
  })

  it('mirrors every English entry in the Portuguese section with a pt-BR page', () => {
    expect(portuguesePart, 'Portuguese section').toBeDefined()
    const portugueseUrls = linkTargets(portuguesePart)
    for (const url of portugueseUrls) expect(url.startsWith(`${SITE_ORIGIN}/pt-br/`), url).toBe(true)
    expect(portugueseUrls).toHaveLength(linkTargets(englishPart).length)
  })
})
