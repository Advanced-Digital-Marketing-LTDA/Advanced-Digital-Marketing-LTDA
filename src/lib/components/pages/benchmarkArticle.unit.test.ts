import { describe, expect, it } from 'vitest'
import { benchmarkCellRole, formatBenchmarkHtml, groupContents, isBenchmarkArticle } from './benchmarkArticle'

const table = '<table>\n<thead>\n<tr>\n<th align="left">Project</th>\n<th align="right">Open issues</th>\n<th align="right">Slop Log Score</th>\n</tr>\n</thead>\n'
  + '<tbody><tr>\n<td align="left"><a href="https://github.com/a/b">a/b</a></td>\n<td align="right">12</td>\n<td align="right">0.9031</td>\n</tr>\n</tbody></table>'
const article = `${table}\n<p><a id="a-b-0-9031-log-score"></a></p>\n<h2 id="a-b-0-9031-slop-log-score">a/b: 0.9031 Slop Log Score</h2>\n`
  + '<p>Selected discussions: <a href="https://github.com/a/b/issues/1">first thread</a>; <a href="https://github.com/a/b/issues/2">second thread</a>.</p>\n'
  + '<h2 id="what-the-slop-benchmark-says-overall">What the Slop Benchmark says overall</h2>\n'

describe('benchmark article formatting', () => {
  it('recognises a benchmark by its scored project headings', () => {
    expect(isBenchmarkArticle([{ id: 'intro', text: 'Intro' }, { id: 'a', text: 'a/b: 0.9031 Slop Log Score' }])).toBe(true)
    expect(isBenchmarkArticle([{ id: 'intro', text: 'Intro' }, { id: 'setup', text: 'Coolify setup: 3 steps' }])).toBe(false)
  })

  it('assigns card roles from column names', () => {
    expect(['Project', 'Slop Log Score', 'Category', 'Open PRs', 'Basis'].map(benchmarkCellRole))
      .toEqual(['name', 'score', 'category', 'stat', 'meta'])
  })

  it('labels every table cell with its column and wraps the table', () => {
    const html = formatBenchmarkHtml(article)
    expect(html).toContain('<div class="benchmark-table" role="region"')
    expect(html).toContain('<td align="right" class="benchmark-cell benchmark-cell--score" data-label="Slop Log Score">0.9031</td>')
    expect(html).toContain('<th align="left" class="benchmark-cell benchmark-cell--name" data-label="Project">Project</th>')
  })

  it('keeps headings, anchors and link text while restructuring them', () => {
    const html = formatBenchmarkHtml(article)
    expect(html).toContain('<a id="a-b-0-9031-log-score" class="benchmark-anchor"></a>')
    expect(html).not.toContain('<p><a id=')
    expect(html).toContain('<h2 id="a-b-0-9031-slop-log-score" class="benchmark-project">')
    expect(html).toContain('<span class="benchmark-project__name">a/b</span><span class="benchmark-project__sep">: </span>'
      + '<span class="benchmark-project__score"><span class="benchmark-project__value">0.9031</span> Slop Log Score</span></h2>')
    expect(html).toContain('<p class="benchmark-threads__label">Selected discussions:</p><ul class="benchmark-threads">'
      + '<li><a href="https://github.com/a/b/issues/1">first thread</a></li><li><a href="https://github.com/a/b/issues/2">second thread</a></li></ul>')
    expect(html).toContain('<h2 id="what-the-slop-benchmark-says-overall">What the Slop Benchmark says overall</h2>')
  })

  it('lists links joined with commas and keeps a trailing sentence', () => {
    const html = formatBenchmarkHtml(article.replace(
      '<p>Selected discussions: <a href="https://github.com/a/b/issues/1">first thread</a>; <a href="https://github.com/a/b/issues/2">second thread</a>.</p>',
      '<p>Selected threads: <a href="https://github.com/a/b/issues/1">#1</a>, <a href="https://github.com/a/b/issues/2">#2</a>, and <a href="https://github.com/a/b/issues/3">#3</a>. These are samples.</p>',
    ))
    expect(html).toContain('<p class="benchmark-threads__label">Selected threads:</p><ul class="benchmark-threads"><li><a href="https://github.com/a/b/issues/1">#1</a></li>'
      + '<li><a href="https://github.com/a/b/issues/2">#2</a></li><li><a href="https://github.com/a/b/issues/3">#3</a></li></ul><p>These are samples.</p>')
  })

  it('fails loudly when the article shape changes', () => {
    expect(() => formatBenchmarkHtml(article.replace(/<table>[\s\S]*<\/table>/, ''))).toThrow(/exactly one table/)
    expect(() => formatBenchmarkHtml(article.replace('Slop Log Score</th>', 'Score</th>'))).toThrow(/Slop Log Score column/)
    expect(() => formatBenchmarkHtml(article.replace('<td align="right">12</td>\n', ''))).toThrow(/fewer cells/)
    expect(() => formatBenchmarkHtml(article.replaceAll(': 0.9031 Slop Log Score</h2>', '</h2>'))).toThrow(/no project headings/)
  })
})

describe('benchmark contents', () => {
  const headings = [
    { id: 'intro', text: 'The comparison table' },
    { id: 'a', text: 'a/b: 0.9031 Slop Log Score' },
    { id: 'c', text: 'Cindy: 1.1315 Slop Log Score' },
    { id: 'end', text: 'What the Slop Benchmark says overall' },
  ]

  it('groups project headings by name between the surrounding sections', () => {
    expect(groupContents(headings, true)).toEqual([
      { kind: 'link', link: headings[0] },
      { kind: 'projects', links: [{ id: 'a', text: 'a/b' }, { id: 'c', text: 'Cindy' }] },
      { kind: 'link', link: headings[3] },
    ])
  })

  it('leaves other articles flat and rejects a benchmark with no projects', () => {
    expect(groupContents(headings, false)).toHaveLength(4)
    expect(() => groupContents([headings[0]], true)).toThrow(/no project headings/)
  })
})
