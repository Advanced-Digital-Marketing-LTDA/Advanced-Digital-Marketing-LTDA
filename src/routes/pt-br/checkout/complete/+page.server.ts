import type { PageServerLoad } from './$types'
import { loadStripeCompletion } from '$lib/server/stripe-completion'

export type { StripeCompletionState } from '$lib/server/stripe-completion'

// Stripe (pt-BR) return page: the Portuguese counterpart of /checkout/complete/.
// Both locales pay through the same USD Stripe checkout, so the live session
// verification and binding checks are shared
// (src/lib/server/stripe-completion.ts); only the page copy differs.
export const prerender = false

export const load: PageServerLoad = (event) => loadStripeCompletion(event)
