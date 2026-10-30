import { describe, expect, it } from 'vitest'
import {
  MIGRATION_MULTIPLIER,
  WEBSITE_BUILD_BASE_PRICE,
  WEBSITE_BUILD_KINDS,
  WEBSITE_BUILD_NAMES,
  WEBSITE_BUILD_TYPES,
  formatBuildPrice,
  isWebsiteBuildKind,
  isWebsiteBuildType,
  websiteBuildExternalReference,
  websiteBuildPrice,
  websiteBuildPriceUSD,
  websiteBuildTitle,
} from './website-builds'

describe('website build pricing (user-defined)', () => {
  it('stores the agreed base prices per locale and build type', () => {
    expect(WEBSITE_BUILD_BASE_PRICE['en-US']).toEqual({ website: 750, ecommerce: 1500 })
    expect(WEBSITE_BUILD_BASE_PRICE['pt-BR']).toEqual({ website: 3000, ecommerce: 6000 })
  })

  it('keeps new-build prices at the base rate', () => {
    expect(websiteBuildPrice('en-US', 'website', 'new')).toBe(750)
    expect(websiteBuildPrice('en-US', 'ecommerce', 'new')).toBe(1500)
    expect(websiteBuildPrice('pt-BR', 'website', 'new')).toBe(3000)
    expect(websiteBuildPrice('pt-BR', 'ecommerce', 'new')).toBe(6000)
  })

  it('applies the 2× multiplier for migrations', () => {
    expect(MIGRATION_MULTIPLIER).toBe(2)
    expect(websiteBuildPrice('en-US', 'website', 'migration')).toBe(1500)
    expect(websiteBuildPrice('en-US', 'ecommerce', 'migration')).toBe(3000)
    expect(websiteBuildPrice('pt-BR', 'website', 'migration')).toBe(6000)
    expect(websiteBuildPrice('pt-BR', 'ecommerce', 'migration')).toBe(12000)
  })
})

describe('formatBuildPrice', () => {
  it('formats whole prices without cents in the locale currency', () => {
    expect(formatBuildPrice('en-US', 750)).toBe('$750')
    expect(formatBuildPrice('en-US', 1500)).toBe('$1,500')
    expect(formatBuildPrice('pt-BR', 3000)).toBe('R$\u00A03.000')
    expect(formatBuildPrice('pt-BR', 12000)).toBe('R$\u00A012.000')
  })
})

describe('authoritative USD pricing (checkout currency, both locales)', () => {
  it('prices new builds at the USD base and migrations at 2×', () => {
    expect(websiteBuildPriceUSD('website', 'new')).toBe(750)
    expect(websiteBuildPriceUSD('ecommerce', 'new')).toBe(1500)
    expect(websiteBuildPriceUSD('website', 'migration')).toBe(1500)
    expect(websiteBuildPriceUSD('ecommerce', 'migration')).toBe(3000)
  })

  it('keeps the USD display prices equal to what checkout charges', () => {
    // The checkout forms show websiteBuildPrice('en-US') formatted as USD on
    // both locales; if it ever diverges from the charged amount, this fails.
    for (const type of WEBSITE_BUILD_TYPES) {
      for (const kind of WEBSITE_BUILD_KINDS) {
        expect(websiteBuildPriceUSD(type, kind)).toBe(websiteBuildPrice('en-US', type, kind))
      }
    }
  })
})

describe('website build guards and checkout metadata', () => {
  it('validates build types and kinds', () => {
    expect(isWebsiteBuildType('website')).toBe(true)
    expect(isWebsiteBuildType('ecommerce')).toBe(true)
    expect(isWebsiteBuildType('shopify')).toBe(false)
    expect(isWebsiteBuildType(42)).toBe(false)
    expect(isWebsiteBuildType(undefined)).toBe(false)
    expect(isWebsiteBuildKind('new')).toBe(true)
    expect(isWebsiteBuildKind('migration')).toBe(true)
    expect(isWebsiteBuildKind('redesign')).toBe(false)
  })

  it('builds deterministic external references without PII', () => {
    expect(websiteBuildExternalReference('website', 'new')).toBe('website-build:website:new')
    expect(websiteBuildExternalReference('ecommerce', 'migration')).toBe('website-build:ecommerce:migration')
  })

  it('builds checkout titles per locale, flagging migrations', () => {
    expect(websiteBuildTitle('en-US', 'website', 'new')).toBe('Website Development')
    expect(websiteBuildTitle('en-US', 'ecommerce', 'migration')).toBe('Ecommerce Website Development (Migration)')
    expect(websiteBuildTitle('pt-BR', 'website', 'new')).toBe('Desenvolvimento de Site')
    expect(websiteBuildTitle('pt-BR', 'ecommerce', 'migration')).toBe('Desenvolvimento de Site E-commerce (Migração)')
  })

  it('keeps the UI names in sync with the checkout titles', () => {
    for (const locale of ['en-US', 'pt-BR'] as const) {
      for (const type of WEBSITE_BUILD_TYPES) {
        expect(websiteBuildTitle(locale, type, 'new')).toBe(WEBSITE_BUILD_NAMES[locale][type])
      }
    }
  })
})
