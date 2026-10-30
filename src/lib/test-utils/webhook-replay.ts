import fc from 'fast-check'
import { expect } from 'vitest'

const byText = (a: string, b: string) => a.localeCompare(b)

type ReplayOutcome = { handled: boolean; action?: string; code?: string }

/** Owner-email stub for one delivery: throws when the delivery is flagged to fail, records the event otherwise. */
export type ReplaySender = () => Promise<{ messageId: string }>

/**
 * Replays random delivery sequences through a webhook receiver and checks the
 * dedupe contract: one owner email per event, `processing_failed` (and a retry)
 * until the first healthy delivery, `deduplicated` after it.
 *
 * @param deliver - Signs and processes one delivery of event `id` with the given sender.
 */
export async function assertReplayContract(deliver: (id: string, sendEmail: ReplaySender) => Promise<ReplayOutcome>, reset: () => void): Promise<void> {
  // Each delivery names one of five events; a flagged delivery's email send throws.
  const deliveries = fc.array(fc.record({ event: fc.integer({ min: 0, max: 4 }), fails: fc.boolean() }), { maxLength: 40 })
  await fc.assert(fc.asyncProperty(deliveries, async (plan) => {
    reset()
    const delivered: string[] = []
    const sent = new Set<string>()
    for (const { event, fails } of plan) {
      const id = String(event)
      const outcome = await deliver(id, async () => {
        if (fails) throw new Error('mailjet down')
        delivered.push(id)
        return { messageId: `m_${id}` }
      })
      if (sent.has(id)) {
        expect(outcome).toEqual({ handled: true, action: 'deduplicated' })
      } else if (fails) {
        expect(outcome).toEqual({ handled: false, code: 'processing_failed' })
      } else {
        expect(outcome.handled).toBe(true)
        sent.add(id)
      }
    }
    // One delivered email per event that had at least one healthy delivery.
    expect(delivered.sort(byText)).toEqual([...sent].sort(byText))
  }))
}
