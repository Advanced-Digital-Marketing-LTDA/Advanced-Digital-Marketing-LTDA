/**
 * Browser-side analytics initialization and checkout events.
 *
 * Sends `begin_checkout` and `purchase` through the page's gtag.js command
 * queue (`gtag('event', ...)`). gtag.js ignores plain objects pushed onto
 * `dataLayer` (that is a GTM-only convention), so events must go through
 * `window.gtag`. A missing gtag (blocked, excluded route) is logged with
 * console.info and reported to the caller. Shared by the subscription
 * configurator, the one-time website build purchase and both return pages.
 */
import type { BeforeNavigate } from '@sveltejs/kit'
import { analyticsReferrer, isSensitiveAnalyticsUrl } from '$lib/analytics-privacy'

const MEASUREMENT_ID = 'G-ZREVRSHYJA'
const SCRIPT_ID = 'adm-google-tag'

type AnalyticsWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...parameters: unknown[]) => void
}

/** Called during layout initialization, before checkout child effects run. */
export function initializeAnalytics(): boolean {
  if (typeof window === 'undefined' || isSensitiveAnalyticsUrl(new URL(window.location.href))) return false
  if (document.getElementById(SCRIPT_ID)) return true

  const browser = window as AnalyticsWindow
  const layer = Array.isArray(browser.dataLayer) ? browser.dataLayer : []
  browser.dataLayer = layer
  browser.gtag = function (..._parameters: unknown[]) {
    layer.push(arguments)
  }
  // Configure before the script can execute. Default pageviews/history tracking
  // remain available only within safe documents; excluded routes always reload.
  browser.gtag('js', new Date())
  browser.gtag('config', MEASUREMENT_ID, { page_referrer: analyticsReferrer(document.referrer) })

  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.async = true
  script.referrerPolicy = 'no-referrer'
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  script.onerror = () => console.warn('[analytics] Google tag failed to load')
  document.head.appendChild(script)
  return true
}

/**
 * Keep loaded tags out of contact documents, including on browser Back/Forward.
 * Both sides reload so excluded URLs never enter a tracked document's history.
 * send_page_view:false alone would still allow GA enhanced history measurements.
 */
export function protectAnalyticsNavigation(navigation: Pick<BeforeNavigate, 'from' | 'to' | 'willUnload' | 'cancel'>): void {
  if (navigation.willUnload || !navigation.to) return
  if (!isSensitiveAnalyticsUrl(navigation.to.url)
    && (!navigation.from || !isSensitiveAnalyticsUrl(navigation.from.url))) return

  navigation.cancel()
  window.location.assign(navigation.to.url.href)
}

type GtagFunction = NonNullable<AnalyticsWindow['gtag']>

function gtagFunction(): GtagFunction | undefined {
  if (typeof window === 'undefined') return undefined
  if (isSensitiveAnalyticsUrl(new URL(window.location.href))) return undefined
  const { gtag } = window as AnalyticsWindow
  return typeof gtag === 'function' ? gtag : undefined
}

/** Queue a GA4 event via gtag.js. Returns false (logged) when gtag is unavailable. */
function sendEvent(name: string, parameters: Record<string, unknown>): boolean {
  const gtag = gtagFunction()
  if (!gtag) {
    console.info(`[checkout] analytics: gtag unavailable; ${name} was not fired`)
    return false
  }
  gtag('event', name, parameters)
  return true
}

/**
 * Shared purchase-conversion event. Only ever called with a server-verified
 * payment/subscription (the return page's live Mercado Pago / Stripe check) —
 * never from the browser on its own. Returns false when gtag is unavailable
 * (logged loudly); callers dedupe per order id so revisits do not recount.
 */
export function firePurchase(input: {
  orderId: string
  value: number
  currency: 'BRL' | 'USD'
  items: { item_id: string; item_name: string }[]
}): boolean {
  return sendEvent('purchase', {
    currency: input.currency,
    value: input.value,
    transaction_id: input.orderId,
    items: input.items,
  })
}

export function fireBeginCheckout(items: { item_id: string; item_name: string }[], value: number, currency: 'BRL' | 'USD' = 'BRL'): void {
  sendEvent('begin_checkout', { currency, value, items })
}
