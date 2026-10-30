import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { isProcessed, markProcessed, resetWebhookDedupe } from './webhook-dedupe'

// Replay behaviour through the real receivers lives in stripe-webhook.unit.test.ts
// and mercadoPago-webhook.unit.test.ts; these cover the store's own window and bounds.
describe('webhook dedupe store', () => {
  beforeEach(() => resetWebhookDedupe())
  afterEach(() => {
    vi.useRealTimers()
    resetWebhookDedupe()
  })

  it('treats a replay after the 24 hour window as a new delivery', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-30T12:00:00Z'))
    markProcessed('evt_late')
    vi.setSystemTime(new Date('2026-10-31T11:59:59Z'))
    expect(isProcessed('evt_late')).toBe(true)
    vi.setSystemTime(new Date('2026-10-31T12:00:01Z'))
    expect(isProcessed('evt_late')).toBe(false)
  })

  it('sweeps expired markers before evicting a live one when the store is full', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-30T12:00:00Z'))
    for (let index = 1; index < 5_000; index += 1) markProcessed(`evt_${index}`)
    // Newest in insertion order but already expired, so only a sweep can free its slot.
    vi.setSystemTime(new Date('2026-10-29T00:00:00Z'))
    markProcessed('evt_expired')
    vi.setSystemTime(new Date('2026-10-30T13:00:00Z'))
    const logged = vi.spyOn(console, 'error').mockImplementation(() => {})
    markProcessed('evt_new')
    expect(logged).not.toHaveBeenCalled()
    logged.mockRestore()
    expect(isProcessed('evt_1')).toBe(true)
    expect(isProcessed('evt_new')).toBe(true)
  })

  it('logs loudly when a full store evicts a live marker', () => {
    const logged = vi.spyOn(console, 'error').mockImplementation(() => {})
    for (let index = 0; index < 5_000; index += 1) markProcessed(`evt_${index}`)
    expect(logged).not.toHaveBeenCalled()
    markProcessed('evt_5000')
    expect(logged).toHaveBeenCalledTimes(1)
    expect(logged.mock.calls[0][0]).toContain('evt_0')
    expect(isProcessed('evt_5000')).toBe(true)
    expect(isProcessed('evt_0')).toBe(false)
    logged.mockRestore()
  })
})
