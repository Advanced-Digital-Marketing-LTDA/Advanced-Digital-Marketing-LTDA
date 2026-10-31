/**
 * Shared bounded in-memory dedupe for webhook events (Stripe).
 *
 * Redeliveries are acknowledged without repeating the side effect: an event
 * that was already processed within DEDUPE_TTL_MS does not trigger the owner
 * notification again. Kept as its own module (AGENTS.md: DO create reusable
 * code) so any future webhook receiver shares the same eviction and TTL.
 */

const processedEvents = new Map<string, number>()
const MAX_PROCESSED_EVENTS = 5_000
/** Redelivered events within this window are treated as already handled. */
const DEDUPE_TTL_MS = 24 * 60 * 60_000

/**
 * Determines whether an event has a valid processed marker.
 *
 * @param key - The event key used for deduplication
 * @returns `true` if the event has an unexpired processed marker, `false` otherwise.
 */
export function isProcessed(key: string): boolean {
  const expiry = processedEvents.get(key)
  if (expiry === undefined) return false
  if (expiry < Date.now()) {
    processedEvents.delete(key)
    return false
  }
  return true
}

/** Drops every expired marker. */
function sweepExpired(now: number): void {
  for (const [key, expiry] of processedEvents) {
    if (expiry < now) processedEvents.delete(key)
  }
}

/**
 * Drops the oldest marker while it is still live. A redelivery of that event
 * within its window would repeat the owner notification, so this logs loudly.
 */
function evictOldestLive(): void {
  const oldest = processedEvents.keys().next().value
  if (oldest === undefined) return
  console.error(`[webhook-dedupe] store full (${MAX_PROCESSED_EVENTS} live markers); evicting unexpired marker ${oldest}`)
  processedEvents.delete(oldest)
}

/**
 * Records an event as processed for deduplication.
 *
 * @param key - The unique key identifying the webhook event
 */
export function markProcessed(key: string): void {
  if (processedEvents.size >= MAX_PROCESSED_EVENTS) sweepExpired(Date.now())
  if (processedEvents.size >= MAX_PROCESSED_EVENTS) evictOldestLive()
  processedEvents.set(key, Date.now() + DEDUPE_TTL_MS)
}

/** Removes the dedupe marker so a redelivery can be processed again. */
export function unmarkProcessed(key: string): void {
  processedEvents.delete(key)
}

/** Clears the in-memory redelivery dedupe (test isolation). */
export function resetWebhookDedupe(): void {
  processedEvents.clear()
}
