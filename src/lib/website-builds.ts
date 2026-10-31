/**
 * One-time website build pricing (user-defined spec).
 *
 * Website builds are a fixed one-time cost, NOT part of the monthly
 * subscription catalog. Two choices drive the price:
 *  - build type: `website` (base) or `ecommerce` (base × 2)
 *  - project kind: `new` (base) or `migration` (base × 2)
 *
 * Display prices are per locale: pt-BR pages show reais, en-US pages show
 * dollars. Checkout (Stripe, both locales) is always priced in USD from the
 * en-US table via `websiteBuildPriceUSD` (server-side only); a
 * browser-supplied amount is never accepted.
 */
import type { Locale } from '$lib/locale'

export const WEBSITE_BUILD_TYPES = ['website', 'ecommerce'] as const
export type WebsiteBuildType = (typeof WEBSITE_BUILD_TYPES)[number]

export const WEBSITE_BUILD_KINDS = ['new', 'migration'] as const
export type WebsiteBuildKind = (typeof WEBSITE_BUILD_KINDS)[number]

/** Base one-time price per locale and build type (before the kind multiplier). */
export const WEBSITE_BUILD_BASE_PRICE: Record<Locale, Record<WebsiteBuildType, number>> = {
  'en-US': { website: 750, ecommerce: 1500 },
  'pt-BR': { website: 3000, ecommerce: 6000 },
}

/** Migrating an existing site costs 2× the base build price. */
export const MIGRATION_MULTIPLIER = 2

/** AUTHORITATIVE one-time build price in USD — the only amount the Stripe
 *  checkout (both locales) ever charges — including the kind multiplier, from
 *  the same table the en-US display prices come from. */
export function websiteBuildPriceUSD(type: WebsiteBuildType, kind: WebsiteBuildKind): number {
  const base = WEBSITE_BUILD_BASE_PRICE['en-US'][type]
  return kind === 'migration' ? base * MIGRATION_MULTIPLIER : base
}

export function isWebsiteBuildType(value: unknown): value is WebsiteBuildType {
  return typeof value === 'string' && (WEBSITE_BUILD_TYPES as readonly string[]).includes(value)
}

export function isWebsiteBuildKind(value: unknown): value is WebsiteBuildKind {
  return typeof value === 'string' && (WEBSITE_BUILD_KINDS as readonly string[]).includes(value)
}

/** Build names per locale and type (single source for UI and checkout titles). */
export const WEBSITE_BUILD_NAMES: Record<Locale, Record<WebsiteBuildType, string>> = {
  'en-US': { website: 'Website Development', ecommerce: 'Ecommerce Website Development' },
  'pt-BR': { website: 'Desenvolvimento de Site', ecommerce: 'Desenvolvimento de Site E-commerce' },
}

const MIGRATION_SUFFIX: Record<Locale, string> = {
  'en-US': ' (Migration)',
  'pt-BR': ' (Migração)',
}

/** Checkout item title, e.g. "Ecommerce Website Development (Migration)". */
export function websiteBuildTitle(locale: Locale, type: WebsiteBuildType, kind: WebsiteBuildKind): string {
  return kind === 'migration' ? `${WEBSITE_BUILD_NAMES[locale][type]}${MIGRATION_SUFFIX[locale]}` : WEBSITE_BUILD_NAMES[locale][type]
}

/** Deterministic checkout reference (Stripe `client_reference_id`), e.g. "website-build:website:new". */
export function websiteBuildExternalReference(type: WebsiteBuildType, kind: WebsiteBuildKind): string {
  return `website-build:${type}:${kind}`
}

export function websiteBuildPrice(locale: Locale, type: WebsiteBuildType, kind: WebsiteBuildKind): number {
  const base = WEBSITE_BUILD_BASE_PRICE[locale][type]
  return kind === 'migration' ? base * MIGRATION_MULTIPLIER : base
}

const brlWholeFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})
const usdWholeFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

/** Formats a build price in the locale's currency, whole (e.g. R$ 3.000 / $1,500). */
export function formatBuildPrice(locale: Locale, value: number): string {
  return locale === 'pt-BR' ? brlWholeFormatter.format(value) : usdWholeFormatter.format(value)
}
