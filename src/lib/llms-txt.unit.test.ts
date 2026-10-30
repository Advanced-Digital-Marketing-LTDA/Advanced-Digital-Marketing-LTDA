import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { SITE_ORIGIN } from './locale'

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8')
const sitemapUrls = new Set([...read('../../static/sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]))
const llmsUrls = [...read('../../static/llms.txt').matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((match) => match[1])

describe('static/llms.txt', () => {
  it('links only canonical sitemap pages on this site', () => {
    expect(llmsUrls.length).toBeGreaterThan(0)
    for (const url of llmsUrls) {
      expect(url.startsWith(SITE_ORIGIN), url).toBe(true)
      expect(sitemapUrls.has(url), url).toBe(true)
    }
  })
})
