// Ratchets: counts may only move in the safe direction. Usage:
//   node scripts/ratchet.mjs [test|suppress|type|all] [--update]
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const BASELINE = '.ratchet/baseline.json'
const RATCHETS = {
  // tests may only grow
  test: { dir: 'src', files: /\.test\.ts$/, pattern: /^\s*(?:it|test)(?:\.\w+)?\s*\(/gm, direction: 'min' },
  // suppressions may only shrink
  suppress: {
    dir: 'src',
    files: /\.(ts|svelte)$/,
    pattern: /@ts-ignore|@ts-expect-error|@ts-nocheck|eslint-disable|svelte-ignore/g,
    direction: 'max',
  },
  // loose typing may only shrink
  type: { dir: 'src', files: /\.(ts|svelte)$/, pattern: /:\s*any\b|\bas any\b|<any>|\bas unknown as\b/g, direction: 'max' },
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) yield* walk(path)
    else yield path
  }
}

export function count({ dir, files, pattern }) {
  let total = 0
  for (const path of walk(dir)) {
    if (files.test(path)) total += (readFileSync(path, 'utf8').match(pattern) ?? []).length
  }
  return total
}

const args = process.argv.slice(2)
const update = args.includes('--update')
const names = args.filter((a) => !a.startsWith('--'))
const selected = !names.length || names[0] === 'all' ? Object.keys(RATCHETS) : names
const baseline = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')) : {}
let failed = false

for (const name of selected) {
  const rule = RATCHETS[name]
  if (!rule) {
    console.error(`Unknown ratchet "${name}"`)
    process.exit(2)
  }
  const current = count(rule)
  const previous = baseline[name]
  const worse = previous !== undefined && (rule.direction === 'min' ? current < previous : current > previous)
  if (update) {
    baseline[name] = current
    console.log(`${name}: baseline set to ${current}`)
  } else if (previous === undefined) {
    console.error(`${name}: no baseline. Run "npm run ratchet:update".`)
    failed = true
  } else if (worse) {
    console.error(`${name}: FAILED. ${current} now vs baseline ${previous} (${rule.direction === 'min' ? 'must not drop' : 'must not rise'}).`)
    failed = true
  } else {
    console.log(`${name}: ok (${current}, baseline ${previous})`)
  }
}

if (update) writeFileSync(BASELINE, JSON.stringify(baseline, null, 2) + '\n')
process.exit(failed ? 1 : 0)
