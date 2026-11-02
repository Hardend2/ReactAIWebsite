import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axe from 'axe-core'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import App from './App.tsx'
import sources from './content/bronnen.json'
import home from './content/home.json'
import tipsWerkgevers from './content/tipsWerkgevers.json'
import tipsWerkzoekenden from './content/tipsWerkzoekenden.json'
import type { ContentPageData } from './content/types.ts'
import uitdagingen from './content/uitdagingen.json'
import voordelen from './content/voordelen.json'

const routes = [
  { path: '/', heading: 'Neurodiversiteit en werk zoeken' },
  { path: '/voordelen', heading: 'Voordelen' },
  { path: '/uitdagingen', heading: 'Uitdagingen' },
  { path: '/tips-werkzoekenden', heading: 'Tips voor werkzoekenden' },
  { path: '/tips-werkgevers', heading: 'Tips voor werkgevers' },
  { path: '/bronnen', heading: 'Bronnen en over deze site' },
  { path: '/contact', heading: 'Contact' },
  { path: '/bestaat-niet', heading: 'Pagina niet gevonden' },
]

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe.each(routes)('route $path', ({ path, heading }) => {
  it('shows one h1 with the right heading', () => {
    renderAt(path)
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent(heading)
  })

  it('has no automatically detectable accessibility problems', async () => {
    const { container } = renderAt(path)
    // jsdom does no layout, so colour contrast cannot be measured here.
    const results = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } })
    expect(results.violations).toEqual([])
  })

  it('opens every external link safely', () => {
    const { container } = renderAt(path)
    container.querySelectorAll('a[href^="http"]').forEach((link) => {
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})

describe('navigation', () => {
  it('moves to a page through the main menu and marks it as current', async () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    renderAt('/')
    const menu = screen.getByRole('navigation', { name: 'Hoofdmenu' })
    await userEvent.click(within(menu).getByRole('link', { name: 'Uitdagingen' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Uitdagingen')
    expect(within(menu).getByRole('link', { name: 'Uitdagingen' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('moves focus to the main content after navigating', async () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    renderAt('/')
    const menu = screen.getByRole('navigation', { name: 'Hoofdmenu' })
    await userEvent.click(within(menu).getByRole('link', { name: 'Voordelen' }))
    expect(screen.getByRole('main')).toHaveFocus()
  })
})

describe('content', () => {
  const pages: ContentPageData[] = [voordelen, uitdagingen, tipsWerkzoekenden, tipsWerkgevers]
  const knownIds = new Set(sources.map((source) => source.id))

  it('only refers to sources that exist', () => {
    const used = [
      ...home.explainer.paragraphs.flatMap((paragraph) => paragraph.sources),
      ...pages.flatMap((page) => [
        ...(page.note?.sources ?? []),
        ...page.sections.flatMap((section) => [
          ...(section.sources ?? []),
          ...section.items.flatMap((item) => item.sources),
        ]),
      ]),
    ]
    expect(used.filter((id) => !knownIds.has(id))).toEqual([])
  })

  it('gives every item at least one source', () => {
    const missing = pages.flatMap((page) =>
      page.sections.flatMap((section) =>
        section.items.filter((item) => item.sources.length === 0).map((item) => item.title),
      ),
    )
    expect(missing).toEqual([])
  })

  it('lists every source with an organisation, a URL and a date accessed', () => {
    sources.forEach((source) => {
      expect(source.organisation).not.toBe('')
      expect(source.url).toMatch(/^https:\/\//)
      expect(source.accessed).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })
  })
})
