import { readFileSync } from 'node:fs'
import postcss from 'postcss'
import { describe, expect, it } from 'vitest'

const css = postcss.parse(readFileSync(new URL('../app.css', import.meta.url), 'utf8'))

function variables(selector: string) {
  const rule = css.nodes.find((node) => node.type === 'rule' && node.selector === selector)
  if (!rule || rule.type !== 'rule') throw new Error(`Missing CSS rule: ${selector}`)

  const values = new Map<string, string>()
  rule.walkDecls(/^--/, (declaration) => {
    values.set(declaration.prop, declaration.value)
  })
  return values
}

function luminance(hex: string) {
  const match = /^#([\da-f]{6})$/i.exec(hex)
  if (!match) throw new Error(`Expected a six-digit hex color, received ${hex}`)

  const channels = [0, 2, 4].map((offset) => parseInt(match[1].slice(offset, offset + 2), 16) / 255)
  const [red, green, blue] = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  )
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

function contrast(foreground: string, background: string) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
  return (values[0] + 0.05) / (values[1] + 0.05)
}

describe('accessibility text color tokens', () => {
  const root = variables(':root')
  const home = variables('.index-home')
  const pairs = [
    ['general button and error text', root, '--verm-deep', '--paper'],
    ['general text on ink', root, '--verm-on-ink', '--ink'],
    ['homepage button and error text', home, '--index-verm-deep', '--index-paper'],
    ['homepage text on ink', home, '--index-verm-on-ink', '--index-ink'],
  ] as const

  it.each(pairs)('%s meets 4.5:1 minimum contrast', (_label, palette, foreground, background) => {
    const ratio = contrast(palette.get(foreground) ?? '', palette.get(background) ?? '')
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })
})
