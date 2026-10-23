/**
 * Guards the ratchet gate (scripts/ratchet.mjs): what each pattern counts,
 * that names and baseline values are validated loudly, and the direction logic.
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { checkRatchet, grepCount, isWorse, main, parseBaseline, PATTERNS, selectRatchets } from './ratchet.mjs'

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

describe('end-to-end runs on a nested source tree', () => {
  let tree: string
  const put = (path: string, lines: string[]) => {
    mkdirSync(dirname(join(tree, path)), { recursive: true })
    writeFileSync(join(tree, path), lines.join('\n'))
  }
  const baseline = () => JSON.parse(readFileSync(join(tree, '.ratchet/baseline.json'), 'utf8'))
  const writeBaseline = (values: object) => put('.ratchet/baseline.json', [JSON.stringify(values)])

  beforeEach(() => {
    vi.stubEnv('RATCHET_BASE_REF', '')
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    tree = mkdtempSync(join(tmpdir(), 'ratchet-tree-'))
    execFileSync('git', ['init', '-q'], { cwd: tree })
    put('src/lib/deep/a.test.ts', ["it('a', () => {})", "test('b', () => {})"])
    put('scripts/tools/c.unit.test.ts', ["it('c', () => {})"])
    put('src/routes/page/x.ts', ['// @ts-ignore', 'const v: any = 1'])
    put('src/lib/Widget.svelte', ['<!-- svelte-ignore a11y -->'])
  })

  afterEach(() => {
    rmSync(tree, { recursive: true, force: true })
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
  })

  it('counts recursively and passes within the baseline', () => {
    expect(main(['all', '--update'], tree)).toBe(0)
    expect(baseline()).toEqual({ test: 3, suppress: 2, type: 1 })
    expect(main([], tree)).toBe(0)
  })

  it('fails when a test is removed', () => {
    writeBaseline({ test: 3, suppress: 2, type: 1 })
    put('src/lib/deep/a.test.ts', ["it('a', () => {})"])
    expect(main(['test'], tree)).toBe(1)
  })

  it('fails when a test is skipped', () => {
    writeBaseline({ test: 3, suppress: 2, type: 1 })
    put('src/lib/deep/a.test.ts', ["it('a', () => {})", "test.skip('b', () => {})"])
    expect(main(['test'], tree)).toBe(1)
  })

  it('fails when a suppression is added', () => {
    writeBaseline({ test: 3, suppress: 2, type: 1 })
    put('src/lib/new.ts', ['// eslint-disable-next-line'])
    expect(main(['suppress'], tree)).toBe(1)
  })

  it('fails when a loose type is added', () => {
    writeBaseline({ test: 3, suppress: 2, type: 1 })
    put('src/lib/new.ts', ['const m: Record<string, any> = {}'])
    expect(main(['type'], tree)).toBe(1)
  })

  it('update mode writes current counts and tightens freely', () => {
    writeBaseline({ test: 1, suppress: 5, type: 4 })
    expect(main(['all', '--update'], tree)).toBe(0)
    expect(baseline()).toEqual({ test: 3, suppress: 2, type: 1 })
  })

  it('update mode refuses to loosen without --allow-regression', () => {
    writeBaseline({ test: 9, suppress: 0, type: 0 })
    expect(main(['all', '--update'], tree)).toBe(1)
    expect(baseline()).toEqual({ test: 9, suppress: 0, type: 0 })
    expect(main(['all', '--update', '--allow-regression'], tree)).toBe(0)
    expect(baseline()).toEqual({ test: 3, suppress: 2, type: 1 })
  })
})

describe('CI workflow', () => {
  const ci = readFileSync(fileURLToPath(new URL('../.github/workflows/ci.yml', import.meta.url)), 'utf8')

  it('runs on pull requests', () => {
    expect(ci).toMatch(/^on:\n(?:\s+.*\n)*?\s+pull_request:/m)
  })

  it.each(['npm run check', 'npm run test', 'npm run ratchet'])('runs %s', (command) => {
    expect(ci).toMatch(new RegExp(`^\\s+(?:- )?run: ${command}$`, 'm'))
  })
})
