import { describe, expect, it, vi } from 'vitest'
import { render } from 'svelte/server'
import LanguageSwitcher from './components/chrome/LanguageSwitcher.svelte'
import Nav from './components/chrome/Nav.svelte'

const state = vi.hoisted(() => ({ url: new URL('https://example.test/blog/') }))
vi.mock('$app/state', () => ({ page: state }))
vi.mock('$app/environment', () => ({ browser: false }))

describe('English-only blog language switching', () => {
  it.each(['/blog/', '/blog/chatgpt-ads-complete-guide-august-2026/'])(
    'offers only the available English destination on %s', (path) => {
      state.url = new URL(`${path}?utm_source=synthetic`, 'https://example.test')
      const { body } = render(LanguageSwitcher)
      expect(body).toContain(`href="${path}" hreflang="en-US" aria-current="true"`)
      expect(body).not.toContain('hreflang="pt-BR"')
      expect(body).not.toContain('href="/pt-br/"')
    },
  )

  it.each([
    ['/about/', '/about/', '/pt-br/sobre/'],
    ['/pt-br/contato/', '/contact/', '/pt-br/contato/'],
    ['/services/', '/services/', '/pt-br/servicos/'],
    ['/pt-br/servicos/technical-seo/', '/services/technical-seo/', '/pt-br/servicos/technical-seo/'],
  ])('preserves equivalent language destinations on %s', (path, english, portuguese) => {
    state.url = new URL(path, 'https://example.test')
    const { body } = render(LanguageSwitcher)
    expect(body).toContain(`href="${english}" hreflang="en-US"`)
    expect(body).toContain(`href="${portuguese}" hreflang="pt-BR"`)
  })

  it('preserves hidden checkout switching and unknown-route homepage destinations', () => {
    state.url = new URL('/pt-br/checkout/complete/?preapproval_id=synthetic', 'https://example.test')
    expect(render(LanguageSwitcher).body).not.toContain('language-switcher')
    state.url = new URL('/unknown/', 'https://example.test')
    const { body } = render(LanguageSwitcher)
    expect(body).toContain('href="/" hreflang="en-US"')
    expect(body).toContain('href="/pt-br/" hreflang="pt-BR"')
  })

  it('renders an honest English-content label in Portuguese navigation', () => {
    state.url = new URL('/pt-br/', 'https://example.test')
    const header = render(Nav).body.match(/<header\b[\s\S]*?<\/header>/)?.[0]
    expect(header).toBeDefined()
    expect(header).toContain('href="/blog/">Blog (em inglês)</a>')
  })
})
