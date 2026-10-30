import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import fc from 'fast-check'
import { LOCALE_ROUTES, LOCALES, SERVICES_INDEX_ROUTES, SITE_ORIGIN, TRANSLATED_BLOG_SLUGS, localeForPath, localizedPath, type Locale } from './locale'
import { SERVICE_ROUTES } from './services'

const sitemap = readFileSync(new URL('../../static/sitemap.xml', import.meta.url), 'utf8')
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].slice(SITE_ORIGIN.length))

const otherLocale = (locale: Locale): Locale => LOCALES.find((candidate) => candidate !== locale)!

const bilingualPaths = [
  ...Object.values(LOCALE_ROUTES).flatMap((localized) => Object.values(localized)),
  ...Object.values(SERVICES_INDEX_ROUTES),
  ...Object.values(SERVICE_ROUTES).flatMap((localized) => Object.values(localized)),
  '/blog/', '/pt-br/blog/',
  ...TRANSLATED_BLOG_SLUGS.flatMap((slug) => [`/blog/${slug}/`, `/pt-br/blog/${slug}/`]),
]

describe('locale routing properties', () => {
  it('round-trips every bilingual page through its counterpart', () => {
    fc.assert(fc.property(fc.constantFrom(...bilingualPaths), (path) => {
      const locale = localeForPath(path)
      const counterpart = localizedPath(path, otherLocale(locale))
      expect(counterpart, path).toBeDefined()
      expect(localeForPath(counterpart!)).toBe(otherLocale(locale))
      expect(localizedPath(counterpart!, locale)).toBe(path)
    }))
  })

  it('never invents a Portuguese counterpart for an untranslated article', () => {
    const slug = fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/).filter((value) => !TRANSLATED_BLOG_SLUGS.includes(value))
    fc.assert(fc.property(slug, (value) => {
      expect(localizedPath(`/blog/${value}/`, 'pt-BR')).toBeUndefined()
      expect(localizedPath(`/blog/${value}/`, 'en-US')).toBe(`/blog/${value}/`)
      expect(localizedPath(`/pt-br/blog/${value}/`, 'en-US')).toBeUndefined()
    }))
  })

  it('lists the counterpart of every sitemap page that has one', () => {
    fc.assert(fc.property(fc.constantFrom(...sitemapPaths), (path) => {
      const counterpart = localizedPath(path, otherLocale(localeForPath(path)))
      if (counterpart !== undefined) expect(sitemapPaths, `${path} -> ${counterpart}`).toContain(counterpart)
    }))
  })
})
