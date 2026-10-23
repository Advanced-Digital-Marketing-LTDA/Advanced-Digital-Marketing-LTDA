// Ratchets: counts may only move in the safe direction. Usage:
//   node scripts/ratchet.mjs [test|suppress|type|all] [--update [--allow-regression]]
// In CI, RATCHET_BASE_REF (e.g. origin/main) makes the base branch's baseline
// binding too, so a PR cannot loosen the gate by editing its own baseline.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const BASELINE_FILE = '.ratchet/baseline.json'
const SELF = ':(exclude,glob)scripts/ratchet*'
// Same discovery scope as vitest.config.ts
const TEST_FILES = [':(glob)src/**/*.test.ts', ':(glob)scripts/**/*.unit.test.ts', SELF]
const SOURCE_FILES = [':(glob)src/**/*.ts', ':(glob)src/**/*.svelte', ':(glob)scripts/**/*.ts', SELF]

// git grep ERE patterns; counts are matching lines
export const PATTERNS = Object.freeze({
  testDeclared: String.raw`^[[:space:]]*(it|test)(\.[a-z]+)?\(`,
  testDisabled: String.raw`^[[:space:]]*(it|test)\.(skip|todo)\(`,
  suppress: '@ts-ignore|@ts-expect-error|@ts-nocheck|eslint-disable|svelte-ignore',
  looseType: String.raw`[:<,|&=] ?any\b|\bas any\b|\bany\[\]|\bas unknown as\b`,
})

export function grepCount(pattern, pathspecs, cwd = process.cwd()) {
  let output
  try {
    output = execFileSync('git', ['grep', '--untracked', '-c', '-E', '-e', pattern, '--', ...pathspecs], {
      cwd,
      encoding: 'utf8',
    })
  } catch (error) {
    if (error.status === 1 && !error.stderr?.length) return 0 // no matches
    throw new Error(`git grep failed: ${error.stderr || error.message}`)
  }
  return output
    .split('\n')
    .filter(Boolean)
    .reduce((sum, line) => sum + Number(line.slice(line.lastIndexOf(':') + 1)), 0)
}

// Skipped and todo tests do not count as live tests.
export const RATCHETS = new Map([
  ['test', { direction: 'min', count: (cwd) => grepCount(PATTERNS.testDeclared, TEST_FILES, cwd) - grepCount(PATTERNS.testDisabled, TEST_FILES, cwd) }],
  ['suppress', { direction: 'max', count: (cwd) => grepCount(PATTERNS.suppress, SOURCE_FILES, cwd) }],
  ['type', { direction: 'max', count: (cwd) => grepCount(PATTERNS.looseType, SOURCE_FILES, cwd) }],
])

export function selectRatchets(names) {
  if (!names.length || names[0] === 'all') return [...RATCHETS.keys()]
  for (const name of names) {
    if (!RATCHETS.has(name)) throw new Error(`Unknown ratchet "${name}"`)
  }
  return names
}

export function parseBaseline(text, source) {
  const values = new Map()
  for (const [name, value] of Object.entries(JSON.parse(text))) {
    if (!RATCHETS.has(name)) throw new Error(`${source}: unknown ratchet "${name}"`)
    if (!Number.isInteger(value) || value < 0) throw new Error(`${source}: "${name}" must be a non-negative integer, got ${JSON.stringify(value)}`)
    values.set(name, value)
  }
  return values
}

export const isWorse = (direction, current, limit) => (direction === 'min' ? current < limit : current > limit)

function readHeadBaseline(cwd) {
  const file = join(cwd, BASELINE_FILE)
  return existsSync(file) ? parseBaseline(readFileSync(file, 'utf8'), BASELINE_FILE) : new Map()
}

function readBaseBaseline(ref, cwd) {
  if (!ref) return null
  if (!/^[\w./-]+$/.test(ref)) throw new Error(`Invalid RATCHET_BASE_REF "${ref}"`)
  try {
    const text = execFileSync('git', ['show', `${ref}:${BASELINE_FILE}`], { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
    return parseBaseline(text, `${ref}:${BASELINE_FILE}`)
  } catch (error) {
    if (!/does not exist|exists on disk, but not in/.test(String(error.stderr))) throw error
    console.warn(`::warning::${ref} has no ${BASELINE_FILE}; checking against this branch's baseline only.`)
    return null
  }
}

export function checkRatchet(name, direction, current, limits) {
  if (!limits.length) return { ok: false, message: `${name}: no baseline. Run "npm run ratchet:update".` }
  const broken = limits.find((limit) => isWorse(direction, current, limit))
  if (broken === undefined) return { ok: true, message: `${name}: ok (${current}, baseline ${limits.join(' / ')})` }
  const rule = direction === 'min' ? 'must not drop' : 'must not rise'
  return { ok: false, message: `${name}: FAILED. ${current} now vs baseline ${broken} (${rule}).` }
}

function runCheck(names, cwd) {
  const head = readHeadBaseline(cwd)
  const base = readBaseBaseline(process.env.RATCHET_BASE_REF, cwd)
  let ok = true
  for (const name of names) {
    const { direction, count } = RATCHETS.get(name)
    const limits = [head, base].filter((b) => b?.has(name)).map((b) => b.get(name))
    const result = checkRatchet(name, direction, count(cwd), limits)
    if (result.ok) console.log(result.message)
    else console.error(result.message)
    ok &&= result.ok
  }
  return ok ? 0 : 1
}

function runUpdate(names, allowRegression, cwd) {
  const baseline = readHeadBaseline(cwd)
  const regressions = []
  for (const name of names) {
    const { direction, count } = RATCHETS.get(name)
    const current = count(cwd)
    if (baseline.has(name) && isWorse(direction, current, baseline.get(name))) regressions.push(`${name}: ${baseline.get(name)} -> ${current}`)
    baseline.set(name, current)
  }
  if (regressions.length && !allowRegression) {
    console.error(`Refusing to loosen baselines (${regressions.join(', ')}). Pass --allow-regression to accept.`)
    return 1
  }
  for (const regression of regressions) console.warn(`WARNING: loosened ${regression}`)
  const file = join(cwd, BASELINE_FILE)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, JSON.stringify(Object.fromEntries(baseline), null, 2) + '\n')
  console.log(`Baseline written: ${JSON.stringify(Object.fromEntries(baseline))}`)
  return 0
}

export function main(args = process.argv.slice(2), cwd = process.cwd()) {
  try {
    const names = selectRatchets(args.filter((a) => !a.startsWith('--')))
    return args.includes('--update') ? runUpdate(names, args.includes('--allow-regression'), cwd) : runCheck(names, cwd)
  } catch (error) {
    console.error(error.message)
    return 2
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.exit(main())
