import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

const paths = [
  '/',
  '/voordelen',
  '/uitdagingen',
  '/tips-werkzoekenden',
  '/tips-werkgevers',
  '/bronnen',
  '/contact',
  '/bestaat-niet',
]

const viewports = [
  { name: 'desktop', viewport: { width: 1280, height: 800 } },
  { name: 'mobiel', viewport: { width: 375, height: 812 } },
]

async function expectNoViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze()
  const summary = results.violations.map(({ id, nodes }) => ({
    id,
    targets: nodes.map((node) => node.target.join(' ')),
  }))
  expect(summary).toEqual([])
}

for (const { name, viewport } of viewports) {
  test.describe(`WCAG 2.2 AA op ${name}`, () => {
    test.use({ viewport })

    for (const path of paths) {
      test(`${path} heeft geen overtredingen`, async ({ page }) => {
        await page.goto(path)
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
        await expectNoViolations(page)
      })
    }
  })
}

test.describe('WCAG 2.2 AA in andere toestanden', () => {
  test('het open mobiele menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await page.getByRole('button', { name: 'Menu' }).click()
    await expect(page.locator('#hoofdmenu')).toBeVisible()
    await expectNoViolations(page)
  })

  test('het formulier met foutmeldingen', async ({ page }) => {
    await page.goto('/contact')
    await page.getByRole('button', { name: 'Controleer en verstuur' }).click()
    await expect(page.locator('#name-error')).toBeVisible()
    await expectNoViolations(page)
  })

  test('het formulier na een geldige inzending', async ({ page }) => {
    await page.goto('/contact')
    await page.getByLabel('Naam').fill('Sam')
    await page.getByLabel('E-mailadres').fill('naam@voorbeeld.be')
    await page.getByLabel('Bericht').fill('Dit is een geldig bericht.')
    await page.getByRole('button', { name: 'Controleer en verstuur' }).click()
    await expect(page.getByRole('status')).not.toBeEmpty()
    await expectNoViolations(page)
  })
})
