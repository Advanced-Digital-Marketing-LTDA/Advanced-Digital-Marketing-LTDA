/**
 * HTTP status for a rejected webhook delivery (used by the Stripe receiver;
 * extracted from the route because SonarCloud S3358 forbids the nested
 * ternary this replaces).
 *
 * Stripe retries non-2xx: a misconfigured secret (503) and a transient
 * processing failure (500, event unmarked) should be retried, while a bad
 * signature / stale timestamp is rejected outright — retrying would never
 * succeed. The outright-rejection status is the caller's provider convention
 * (Stripe: 400; see the route module).
 */
export function webhookRejectionStatus(code: string, rejectStatus: number): number {
  if (code === 'missing_secret') return 503
  if (code === 'processing_failed') return 500
  return rejectStatus
}
