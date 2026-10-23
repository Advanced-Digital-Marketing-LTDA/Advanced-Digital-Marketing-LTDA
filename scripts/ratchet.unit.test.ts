import { describe, expect, it } from 'vitest'
// @ts-expect-error plain .mjs script without type declarations
import { RATCHETS, selectRatchets } from './ratchet.mjs'

const matches = (name: string, text: string) => text.match(RATCHETS[name].pattern)?.length ?? 0

describe('ratchet patterns', () => {
  it('counts it, test and variant declarations but not mentions', () => {
    const text = [
      "  it('a', () => {})",
      "test.skip('b', () => {})",
      "it.each([1])('c', () => {})",
      "// it('commented mention in prose')",
      "const quit = (x) => x",
    ].join('\n')
    expect(matches('test', text)).toBe(3)
  })

  it('counts suppressions and loose types', () => {
    expect(matches('suppress', '// @ts-ignore\n// eslint-disable-next-line')).toBe(2)
    expect(matches('type', 'const a: any = 1; const b = c as any; const d = e as unknown as F')).toBe(3)
    expect(matches('type', 'const many = 1')).toBe(0)
  })
})

describe('selectRatchets', () => {
  it('selects all by default', () => {
    expect(selectRatchets([])).toEqual(['test', 'suppress', 'type'])
  })

  it('rejects unknown and prototype names loudly', () => {
    expect(() => selectRatchets(['nope'])).toThrow('Unknown ratchet')
    expect(() => selectRatchets(['__proto__'])).toThrow('Unknown ratchet')
    expect(() => selectRatchets(['constructor'])).toThrow('Unknown ratchet')
  })
})
