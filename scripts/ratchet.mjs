// Ratchets: counts may only move in the safe direction. Usage:
//   node scripts/ratchet.mjs [test|suppress|type|all] [--update]
import { readFileSync, writeFileSync, readdirSync, lstatSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const BASELINE = '.ratchet/baseline.json'
export const RATCHETS = Object.freeze({
  // tests may only grow; counts it(, test( and variants such as it.each( / test.skip(
  test: {
    dir: 'src',
    files: /\.test\.ts$/,
    pattern: /^[ \t]*(?:it|test)(?:\.[a-z]+)?\(/gm,
    direction: 'min',
  },
  // suppressions may only shrink
  suppress: {
    dir: 'src',
    files: /\.(ts|svelte)$/,
    pattern: /@ts-ignore|@ts-expect-error|@ts-nocheck|eslint-disable|svelte-ignore/g,
    direction: 'max',
  },
  // loose typing may only shrink
  type: {
    dir: 'src',
    files: /\.(ts|svelte)$/,
    pattern: /: ?any\b|\bas any\b|<any>|\bas unknown as\b/g,
    direction: 'max',
  },
})

// Symlinks are skipped so the walk never leaves the intended root.
function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    const stat = lstatSync(path)
    if (stat.isSymbolicLink()) continue
    if (stat.isDirectory()) yield* walk(path)
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

export function selectRatchets(names) {
  if (!names.length || names[0] === 'all') return Object.keys(RATCHETS)
  for (const name of names) {
    if (!Object.hasOwn(RATCHETS, name)) throw new Error(`Unknown ratchet "${name}"`)
  }
  return names
}

function main() {
  const args = process.argv.slice(2)
  const update = args.includes('--update')
  let selected
  try {
    selected = selectRatchets(args.filter((a) => !a.startsWith('--')))
  } catch (error) {
    console.error(error.message)
    return 2
  }
  const baseline = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')) : {}
  let failed = false

  for (const name of selected) {
    const rule = RATCHETS[name]
    const current = count(rule)
    const previous = Object.hasOwn(baseline, name) ? baseline[name] : undefined
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
  return failed ? 1 : 0
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.exit(main())
