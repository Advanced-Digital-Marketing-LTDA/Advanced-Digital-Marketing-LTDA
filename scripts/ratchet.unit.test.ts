/**
 * Guards the ratchet gate (scripts/ratchet.mjs): what each pattern counts,
 * that names and baseline values are validated loudly, and the direction logic.
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { checkRatchet, grepCount, isWorse, parseBaseline, PATTERNS, selectRatchets } from './ratchet.mjs'

let repo: string
const count = (pattern: string) => grepCount(pattern, ['sample.ts'], repo)

beforeAll(() => {
  repo = mkdtempSync(join(tmpdir(), 'ratchet-'))
  execFileSync('git', ['init', '-q'], { cwd: repo })
  writeFileSync(
    join(repo, 'sample.ts'),
    [
      "  it('a', () => {})",
      "test.skip('b', () => {})",
      "it.todo('c')",
      "it.each([1])('d', () => {})",
      "// it('commented mention in prose')",
      'const quit = (x: number) => x',
      '// @ts-ignore',
      '// eslint-disable-next-line',
      'const a: any = 1',
      'const b = c as any',
      'const m: Record<string, any> = {}',
      'const l: Promise<any[]> = p',
      'const d = e as unknown as F',
      'const many = 1',
    ].join('\n'),
  )
})

afterAll(() => { rmSync(repo, { recursive: true, force: true }); })

describe('ratchet patterns', () => {
  it('counts test declarations and disabled tests separately', () => {
    expect(count(PATTERNS.testDeclared)).toBe(4)
    expect(count(PATTERNS.testDisabled)).toBe(2)
  })

  it('counts suppressions and loose types, not lookalikes', () => {
    expect(count(PATTERNS.suppress)).toBe(2)
    expect(count(PATTERNS.looseType)).toBe(5)
  })

  it('returns 0 when nothing matches', () => {
    expect(count('no-such-token-anywhere')).toBe(0)
  })
})

describe('selectRatchets', () => {
  it('selects all by default', () => {
    expect(selectRatchets([])).toEqual(['test', 'suppress', 'type'])
  })

  it('rejects unknown and prototype names loudly', () => {
    for (const name of ['nope', '__proto__', 'constructor']) {
      expect(() => selectRatchets([name])).toThrow('Unknown ratchet')
    }
  })
})

describe('parseBaseline', () => {
  it('accepts non-negative integers', () => {
    expect(parseBaseline('{"test": 3, "type": 0}', 'f').get('test')).toBe(3)
  })

  it.each(['null', '"abc"', '-1', '1.5'])('rejects %s loudly', (value) => {
    expect(() => parseBaseline(`{"test": ${value}}`, 'f')).toThrow('non-negative integer')
  })

  it('rejects unknown keys', () => {
    expect(() => parseBaseline('{"__proto__": 1}', 'f')).toThrow('unknown ratchet')
  })
})

describe('direction logic', () => {
  it('min ratchets fail on drops, max ratchets on rises', () => {
    expect(isWorse('min', 9, 10)).toBe(true)
    expect(isWorse('min', 11, 10)).toBe(false)
    expect(isWorse('max', 11, 10)).toBe(true)
    expect(isWorse('max', 9, 10)).toBe(false)
  })

  it('checks against every limit, so the base baseline stays binding', () => {
    expect(checkRatchet('test', 'min', 12, [10, 13]).ok).toBe(false)
    expect(checkRatchet('test', 'min', 13, [10, 13]).ok).toBe(true)
  })

  it('fails without a baseline', () => {
    expect(checkRatchet('test', 'min', 1, []).ok).toBe(false)
  })
})
