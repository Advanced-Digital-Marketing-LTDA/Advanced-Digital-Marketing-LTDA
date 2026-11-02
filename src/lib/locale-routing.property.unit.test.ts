import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import fc from 'fast-check'
import { LOCALE_ROUTES, LOCALES, SERVICES_INDEX_ROUTES, SITE_ORIGIN, TRANSLATED_BLOG_SLUGS, localeForPath, localizedPath, type Locale } from './locale'
import { SERVICE_ROUTES } from './services'

const sitemap = readFileSync(new URL('../../static/sitemap.xml', import.meta.url), 'utf8')
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].slice(SITE_ORIGIN.length))

// Untranslated articles: each one listed here must lose its entry when it gets a pt-BR version.
const englishOnlyArticles: string[] = []

const otherLocale = (locale: Locale): Locale => LOCALES.find((candidate) => candidate !== locale)!

const bilingualPaths = [
  ...Object.values(LOCALE_ROUTES).flatMap((localized) => Object.values(localized)),
  ...Object.values(SERVICES_INDEX_ROUTES),
  ...Object.values(SERVICE_ROUTES).flatMap((localized) => Object.values(localized)),
  '/blog/', '/pt-br/blog/',
  ...TRANSLATED_BLOG_SLUGS.flatMap((slug) => [`/blog/${slug}/`, `/pt-br/blog/${slug}/`]),
]

describe('locale routing properties', () => {
  it.each(bilingualPaths)('round-trips %s through its counterpart', (path) => {
    const locale = localeForPath(path)
    const counterpart = localizedPath(path, otherLocale(locale))
    expect(counterpart, path).toBeDefined()
    expect(localeForPath(counterpart!)).toBe(otherLocale(locale))
    expect(localizedPath(counterpart!, locale)).toBe(path)
  })

  it('never invents a Portuguese counterpart for an untranslated article', () => {
    const slug = fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/).filter((value) => !TRANSLATED_BLOG_SLUGS.includes(value))
    fc.assert(fc.property(slug, (value) => {
      expect(localizedPath(`/blog/${value}/`, 'pt-BR')).toBeUndefined()
      expect(localizedPath(`/blog/${value}/`, 'en-US')).toBe(`/blog/${value}/`)
      expect(localizedPath(`/pt-br/blog/${value}/`, 'en-US')).toBeUndefined()
    }))
  })

  it.each(sitemapPaths)('lists the counterpart of sitemap page %s, or marks it English only', (path) => {
    const counterpart = localizedPath(path, otherLocale(localeForPath(path)))
    if (englishOnlyArticles.includes(path)) {
      expect(counterpart, path).toBeUndefined()
    } else {
      expect(counterpart, path).toBeDefined()
      expect(sitemapPaths, `${path} -> ${counterpart}`).toContain(counterpart)
    }
  })
})
