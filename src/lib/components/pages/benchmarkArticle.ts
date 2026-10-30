/**
 * Presentation helpers for the Slop Benchmark articles. They only restructure
 * the rendered Markdown (table cells, project headings, issue-link lists); the
 * article wording, numbers, links and anchor IDs are left exactly as written.
 * Each transform fails loudly when the article no longer has the expected
 * shape, so a content change cannot silently ship the old broken layout.
 */
export const BENCHMARK_SLUGS = ['slop-benchmark-ai-agents', 'agentic-video-benchmark'] as const

export function isBenchmarkSlug(slug: string): boolean {
  return (BENCHMARK_SLUGS as readonly string[]).includes(slug)
}

const PROJECT_HEADING = /^(.+): (\d+\.\d{4}) Slop Log Score$/

export type BenchmarkCellRole = 'name' | 'score' | 'category' | 'stat' | 'meta'

/** Columns shown as the main figures on a mobile card; the rest are secondary. */
const STAT_COLUMNS = ['Open issues', 'Open PRs', 'Merged PRs', 'Releases']

export function benchmarkCellRole(header: string): BenchmarkCellRole {
  if (header === 'Project') return 'name'
  if (header === 'Slop Log Score') return 'score'
  if (header === 'Category') return 'category'
  return STAT_COLUMNS.includes(header) ? 'stat' : 'meta'
}

function escapeAttribute(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function formatTable(table: string): string {
  const headers = [...table.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/g)].map((match) => match[1].trim())
  if (!headers.includes('Project') || !headers.includes('Slop Log Score')) {
    throw new Error(`Benchmark table is missing its Project or Slop Log Score column: ${headers.join(', ')}`)
  }
  const tagged = table.replace(/<tr>([\s\S]*?)<\/tr>/g, (_row: string, cells: string) => {
    let column = 0
    const row = cells.replace(/<(th|td)\b([^>]*)>/g, (_cell: string, name: string, attributes: string) => {
      const header = headers[column++]
      if (header === undefined) throw new Error('Benchmark table row has more cells than header columns')
      return `<${name}${attributes} class="benchmark-cell benchmark-cell--${benchmarkCellRole(header)}" data-label="${escapeAttribute(header)}">`
    })
    if (column !== headers.length) throw new Error('Benchmark table row has fewer cells than header columns')
    return `<tr>${row}</tr>`
  })
  return `<div class="benchmark-table" role="region" aria-label="Benchmark comparison table" tabindex="0">${tagged}</div>`
}

/** Rewrites one benchmark article's rendered HTML for the redesigned layout. */
export function formatBenchmarkHtml(html: string): string {
  const tables = html.match(/<table>[\s\S]*?<\/table>/g) ?? []
  if (tables.length !== 1) throw new Error(`Benchmark article must contain exactly one table (found ${tables.length})`)
  let projects = 0
  const formatted = html
    .replace(/<table>[\s\S]*?<\/table>/, formatTable)
    // Legacy anchors keep old links working without leaving empty paragraphs.
    .replace(/<p><a id="([^"]+)"><\/a><\/p>\n?/g, '<a id="$1" class="benchmark-anchor"></a>\n')
    .replace(/<h2 id="([^"]+)">([^<]+)<\/h2>/g, (heading: string, id: string, text: string) => {
      const match = PROJECT_HEADING.exec(text)
      if (!match) return heading
      projects++
      return `<h2 id="${id}" class="benchmark-project"><span class="benchmark-project__name">${match[1]}</span>`
        + `<span class="benchmark-project__sep">: </span>`
        + `<span class="benchmark-project__score"><span class="benchmark-project__value">${match[2]}</span> Slop Log Score</span></h2>`
    })
    // "Label: <a>…</a>; <a>…</a>." (also ", and" separators and a trailing
    // sentence) becomes a label, a list of the same links and that sentence.
    .replace(
      /<p>([A-Z][^<:]{0,80}): ((?:<a href="[^"]+">[^<]+<\/a>(?:; |, and |, | and )?)+)\.(?: ([^<]+))?<\/p>/g,
      (_paragraph: string, label: string, links: string, note: string | undefined) => {
        const items = [...links.matchAll(/<a href="[^"]+">[^<]+<\/a>/g)].map((link) => `<li>${link[0]}</li>`).join('')
        const trailing = note ? `<p>${note}</p>` : ''
        return `<p class="benchmark-threads__label">${label}:</p><ul class="benchmark-threads">${items}</ul>${trailing}`
      },
    )
  if (projects === 0) throw new Error('Benchmark article has no project headings to format')
  return formatted
}

export type TocLink = { id: string; text: string }
export type TocEntry = { kind: 'link'; link: TocLink } | { kind: 'projects'; links: TocLink[] }

/** Groups a benchmark's project headings under one collapsible contents entry,
 *  listing each project by name only. Other articles keep a flat list. */
export function groupContents(headings: TocLink[], benchmark: boolean): TocEntry[] {
  if (!benchmark) return headings.map((link) => ({ kind: 'link', link }))
  const entries: TocEntry[] = []
  let group: TocLink[] | undefined
  for (const heading of headings) {
    const match = PROJECT_HEADING.exec(heading.text)
    if (!match) {
      group = undefined
      entries.push({ kind: 'link', link: heading })
      continue
    }
    if (!group) {
      group = []
      entries.push({ kind: 'projects', links: group })
    }
    group.push({ id: heading.id, text: match[1] })
  }
  if (!entries.some((entry) => entry.kind === 'projects')) throw new Error('Benchmark contents have no project headings')
  return entries
}
