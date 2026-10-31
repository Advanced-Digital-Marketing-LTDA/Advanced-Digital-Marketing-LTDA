/**
 * Shared helpers for the Stripe checkout endpoint (spec §4, §8).
 * Kept out of `+server.ts` so they are importable by tests — SvelteKit
 * endpoint modules only export HTTP handlers and config keys.
 */

// Linear-time shape: the local and domain-run classes cannot match the literal
// separators ('@' and '.'), so each separator has exactly one match position
// and the engine never backtracks over overlapping repetitions.
const EMAIL_RE = /^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/

/**
 * Basic email shape validation (max length per RFC 5321).
 *
 * The 254-character length guard below MUST stay in front of `EMAIL_RE.test`,
 * enforcing the RFC 5321 maximum address length (the regex itself is linear,
 * so it needs no bounding for backtracking).
 */
export function isValidEmail(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 254 && EMAIL_RE.test(value)
}

/**
 * Back-links for the hosted checkout. The production hostname resolution is
 * shared with the contact form (`publicSiteOrigin()` in site-url.ts) and is
 * loud when it falls back to the canonical origin — see site-url.ts.
 */
import { SERVICES_INDEX_ROUTES, type Locale } from '$lib/locale'
import { publicSiteOrigin } from './site-url.ts'

/** Stripe return page per locale (the cancel URL is the services index). */
const STRIPE_SUCCESS_PATHS: Record<Locale, string> = {
  'en-US': '/checkout/complete/',
  'pt-BR': '/pt-br/checkout/complete/',
}

// Stripe replaces this placeholder with the Checkout Session id on redirect;
// the return page needs it to verify the payment.
const STRIPE_SESSION_QUERY = '?session_id={CHECKOUT_SESSION_ID}'

/** Locale-aware success/cancel URLs for the Stripe hosted checkout. */
export function stripeCheckoutUrls(locale: Locale): { successUrl: string; cancelUrl: string } {
  const origin = publicSiteOrigin()
  return {
    successUrl: new URL(STRIPE_SUCCESS_PATHS[locale], origin).toString() + STRIPE_SESSION_QUERY,
    cancelUrl: new URL(SERVICES_INDEX_ROUTES[locale], origin).toString(),
  }
}
