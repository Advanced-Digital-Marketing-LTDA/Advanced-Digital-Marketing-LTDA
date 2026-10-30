import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import fc from 'fast-check'
import { isProcessed, markProcessed, resetWebhookDedupe } from './webhook-dedupe'

/** Mirrors how both webhook receivers use the dedupe: act once, then mark. */
function deliver(keys: readonly string[]): number {
  let sideEffects = 0
  for (const key of keys) {
    if (isProcessed(key)) continue
    sideEffects += 1
    markProcessed(key)
  }
  return sideEffects
}

describe('webhook dedupe replay properties', () => {
  beforeEach(() => resetWebhookDedupe())
  afterEach(() => {
    vi.useRealTimers()
    resetWebhookDedupe()
  })

  it('runs the side effect exactly once per distinct event, whatever the replay order', () => {
    const deliveries = fc.array(fc.constantFrom('evt_a', 'evt_b', 'evt_c', 'evt_d', 'evt_e'), { maxLength: 60 })
    fc.assert(fc.property(deliveries, (keys) => {
      resetWebhookDedupe()
      expect(deliver(keys)).toBe(new Set(keys).size)
      expect(deliver(keys)).toBe(0)
    }))
  })

  it('treats a replay after the 24 hour window as a new delivery', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-30T12:00:00Z'))
    expect(deliver(['evt_late'])).toBe(1)
    vi.setSystemTime(new Date('2026-10-31T11:59:59Z'))
    expect(deliver(['evt_late'])).toBe(0)
    vi.setSystemTime(new Date('2026-10-31T12:00:01Z'))
    expect(deliver(['evt_late'])).toBe(1)
  })

  it('keeps the newest event deduped when the store is full', () => {
    for (let index = 0; index < 5_001; index += 1) markProcessed(`evt_${index}`)
    expect(isProcessed('evt_5000')).toBe(true)
    expect(isProcessed('evt_0')).toBe(false)
  })
})
