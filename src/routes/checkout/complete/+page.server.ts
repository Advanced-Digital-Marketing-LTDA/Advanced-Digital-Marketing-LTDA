import type { PageServerLoad } from './$types'
import { loadStripeCompletion } from '$lib/server/stripe-completion'

export type { StripeCompletionState } from '$lib/server/stripe-completion'

// Stripe (en-US) return page: verifies the Checkout Session live against the
// Stripe API before claiming success — the browser query params alone are
// never proof of payment. The verification is shared with the pt-BR return
// page (src/lib/server/stripe-completion.ts).
export const prerender = false

export const load: PageServerLoad = (event) => loadStripeCompletion(event)
