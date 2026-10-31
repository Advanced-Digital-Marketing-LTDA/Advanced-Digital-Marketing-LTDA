/**
 * Stripe return-page verification shared by the en-US and pt-BR checkout
 * completion routes: verifies the Checkout Session live against the Stripe
 * API before claiming success — the browser query params alone are never
 * proof of payment.
 */
import { StripeError, getCheckoutSession, type CheckoutSessionStatus } from './stripe.ts'
import { ClientAddressError, clientIpAddress } from './client-ip.ts'
import { checkRateLimit, rateLimitKey } from './rate-limit.ts'
import { authoritativeSubscriptionTotalUSD } from './pricing.ts'
import { getService } from '$lib/catalog'
import { WEBSITE_BUILD_KINDS, WEBSITE_BUILD_TYPES, websiteBuildExternalReference, websiteBuildPriceUSD } from '$lib/website-builds'

export type StripeCompletionState =
  | { state: 'missing' }
  | { state: 'confirmed'; sessionId: string; amountTotal: number | null; clientReferenceId: string | null }
  | { state: 'payment_pending'; sessionId: string }
  | { state: 'payment_unconfirmed'; sessionId: string }
  | { state: 'rate_limited' }
  | { state: 'error' }

const SESSION_ID_RE = /^[A-Za-z0-9_-]{1,128}$/

/** The parts of the SvelteKit load event the completion check reads. */
export type StripeCompletionEvent = {
  url: URL
  getClientAddress: () => string
  setHeaders: (headers: Record<string, string>) => void
}

/**
 * Shared load for the Stripe return pages (/checkout/complete/ and
 * /pt-br/checkout/complete/): both locales bill USD through the same Stripe
 * checkout, so the verification and binding rules are identical — only the
 * page copy differs.
 */
export async function loadStripeCompletion({ url, getClientAddress, setHeaders }: StripeCompletionEvent): Promise<StripeCompletionState> {
  // The rendered state is session-specific and must never be cached by Bunny
  // (same rule as the contact verification loaders).
  setHeaders({ 'Cache-Control': 'private, no-store' })

  const sessionId = url.searchParams.get('session_id')
  if (!sessionId) return { state: 'missing' }

  // Shape check before any outbound call or rate-limit spend.
  if (!SESSION_ID_RE.test(sessionId)) {
    console.warn(`[checkout-stripe] rejecting malformed session_id (${sessionId.length} chars)`)
    return { state: 'error' }
  }

  const address = resolveClientAddress(getClientAddress)
  if (address === null) return { state: 'error' }

  const rateLimit = checkRateLimit(rateLimitKey('stripeVerify', address))
  if (!rateLimit.allowed) {
    console.warn('[checkout-stripe] completion verification rate limit exceeded')
    return { state: 'rate_limited' }
  }

  const session = await fetchSession(sessionId)
  if (!session) return { state: 'error' }

  return classifySession(session)
}

/** Client IP for the rate limit, or null (logged) when it cannot be determined. */
function resolveClientAddress(getClientAddress: () => string): string | null {
  try {
    return clientIpAddress(getClientAddress)
  } catch (error) {
    if (error instanceof ClientAddressError) {
      console.error('[checkout-stripe] cannot determine client IP for completion verification; refusing request')
      return null
    }
    throw error
  }
}

/** The live Checkout Session, or null (logged) when Stripe fails or does not know it. */
async function fetchSession(sessionId: string): Promise<CheckoutSessionStatus | null> {
  let session
  try {
    session = await getCheckoutSession(sessionId)
  } catch (error) {
    if (error instanceof StripeError) {
      console.error(`[checkout-stripe] completion verification failed: ${error.code}`)
      return null
    }
    throw error
  }
  if (!session) {
    console.warn(`[checkout-stripe] session ${sessionId} not found`)
    return null
  }
  return session
}

/**
 * Classifies a verified session into the page state. Every claim — paid OR
 * pending — requires the session to be bound to a server-created checkout
 * (wrong client_reference_id/amount/currency → loud error state, never a
 * success/pending claim for another product). Complete-but-unpaid is a
 * truthful "not confirmed", never a success claim.
 */
function classifySession(session: CheckoutSessionStatus): StripeCompletionState {
  if (session.paymentStatus === 'paid') {
    return claimIfBound(session, 'paid', 'success', {
      state: 'confirmed',
      sessionId: session.id,
      amountTotal: session.amountTotal,
      clientReferenceId: session.clientReferenceId,
    })
  }
  if (isPendingSession(session)) {
    return claimIfBound(session, 'pending', 'pending', { state: 'payment_pending', sessionId: session.id })
  }
  return { state: 'payment_unconfirmed', sessionId: session.id }
}

function isPendingSession(session: CheckoutSessionStatus): boolean {
  return session.status === 'open' || session.status === 'processing' || session.paymentStatus === 'processing'
}

/** Returns the claim only for a session bound to a server-created checkout; otherwise logs and returns the error state. */
function claimIfBound(session: CheckoutSessionStatus, kind: string, claim: string, state: StripeCompletionState): StripeCompletionState {
  if (isSiteStripeSession(session)) return state
  console.warn(
    `[checkout-stripe] ${kind} session ${session.id} does not match a server-created checkout ` +
      `(client_reference_id=${session.clientReferenceId}, amount=${session.amountTotal}, currency=${session.currency}); refusing ${claim} claim`,
  )
  return { state: 'error' }
}

/**
 * True only when a session is bound to a checkout this server created:
 * the client_reference_id must be a deterministic website-build reference with
 * the exact server-derived USD amount, or a valid catalog subscription package
 * (fixed-price amounts must match exactly; ads-spend amounts must sit at or
 * above the US$ 100 floor) in USD. A paid session for anything else never
 * shows the success claim.
 */
function isSiteStripeSession(session: CheckoutSessionStatus): boolean {
  if (session.currency !== 'usd' || session.clientReferenceId === null || session.amountTotal === null) return false
  const reference = session.clientReferenceId

  const buildPrice = websiteBuildPriceForReference(reference)
  if (buildPrice !== null) return session.amountTotal === buildPrice

  return subscriptionAmountMatches(reference, session.amountTotal)
}

/** Fixed-price packages must match exactly; packages with ads spend must sit at or above the floor. */
function subscriptionAmountMatches(reference: string, amountTotal: number): boolean {
  const floor = authoritativeSubscriptionTotalUSD(reference)
  if (floor === null) return false
  const hasAdsSpend = reference.split('+').some((id) => getService(id)?.pricing.kind === 'ads-spend')
  return hasAdsSpend ? amountTotal >= floor : amountTotal === floor
}

/** The server-derived USD price for a website-build reference, or null when the reference is not one. */
function websiteBuildPriceForReference(reference: string): number | null {
  for (const type of WEBSITE_BUILD_TYPES) {
    for (const kind of WEBSITE_BUILD_KINDS) {
      if (reference === websiteBuildExternalReference(type, kind)) return websiteBuildPriceUSD(type, kind)
    }
  }
  return null
}
