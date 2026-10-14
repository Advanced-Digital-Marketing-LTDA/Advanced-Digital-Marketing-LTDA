import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { LOCALE_ROUTES, SERVICES_INDEX_ROUTES, SITE_ORIGIN } from './locale'
import { SERVICE_ROUTES } from './services'

const read = (file: string) => readFileSync(new URL(`../../static/${file}`, import.meta.url), 'utf8')
const sitemapLocs = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
const sitemapPaths = sitemapLocs.map((loc) => loc.slice(SITE_ORIGIN.length))

const PRIVATE_PREFIXES = ['/api/', '/checkout/', '/pt-br/checkout/', '/contact/verify/', '/pt-br/contato/verificar/']

describe('sitemap.xml', () => {
  it('lists every localized public page, services index and service detail', () => {
    const expected = [
      ...Object.values(LOCALE_ROUTES).flatMap((localized) => Object.values(localized)),
      ...Object.values(SERVICES_INDEX_ROUTES),
      ...Object.values(SERVICE_ROUTES).flatMap((localized) => Object.values(localized)),
    ]
    for (const path of expected) expect(sitemapPaths, path).toContain(path)
  })

  it('uses only absolute URLs on the canonical origin', () => {
    for (const loc of sitemapLocs) expect(loc.startsWith(`${SITE_ORIGIN}/`), loc).toBe(true)
  })

  it('uses only canonical absolute URLs with no duplicates, queries or private routes', () => {
    expect(new Set(sitemapPaths).size).toBe(sitemapPaths.length)
    for (const path of sitemapPaths) {
      expect(path, path).toMatch(/^\/([^?#]*\/)?$/)
      expect(PRIVATE_PREFIXES.some((prefix) => path.startsWith(prefix)), path).toBe(false)
    }
  })
})

describe('robots.txt', () => {
  const robots = read('robots.txt')

  it('references the canonical sitemap', () => {
    expect(robots).toContain(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`)
  })

  it('blocks private routes and never blocks a sitemap URL', () => {
    const disallowed = [...robots.matchAll(/^Disallow:\s*(\S+)/gm)].map((match) => match[1])
    for (const prefix of PRIVATE_PREFIXES) expect(disallowed, prefix).toContain(prefix)
    for (const path of sitemapPaths) expect(disallowed.some((rule) => path.startsWith(rule)), path).toBe(false)
  })
})
