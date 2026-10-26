import { describe, expect, it, vi } from 'vitest'
import { render } from 'svelte/server'
import AboutPage from './components/pages/AboutPage.svelte'
import HomePageFixture from './test-utils/HomePageFixture.svelte'
import { PAGE_COPY } from './constants'
import { LOCALES, SERVICES_INDEX_ROUTES, type Locale } from './locale'
import { SERVICE_ROUTES } from './services'

vi.mock('$app/environment', () => ({ browser: false }))

function serviceLinks(locale: Locale) {
  const { body } = render(HomePageFixture, { props: { locale } })
  return [...body.matchAll(/<a class="svc-link" href="([^"]+)"[^>]*>(.*?)<span/gs)].map(([, href, text]) => ({
    href,
    text: text.replace(/<!--.*?-->/g, ''),
  }))
}

describe('homepage service card links', () => {
  it.each(LOCALES)('links each card to its own service page in %s', (locale) => {
    const cards = PAGE_COPY[locale].home.services
    const links = serviceLinks(locale)
    expect(links).toHaveLength(cards.length)
    cards.forEach((card, i) => {
      expect(links[i].href).toBe(SERVICE_ROUTES[card.serviceId][locale])
      expect(links[i].text).toContain(card.title)
    })
  })
})

describe('about page services link', () => {
  it.each(LOCALES)('links to the services index in %s', (locale) => {
    const { body } = render(AboutPage, { props: { locale } })
    expect(body).toContain(`<a href="${SERVICES_INDEX_ROUTES[locale]}">`)
  })
})
