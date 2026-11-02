import { expect, test } from '@playwright/test'

const pages = [
  { path: '/voordelen', link: 'Voordelen', heading: 'Voordelen' },
  { path: '/uitdagingen', link: 'Uitdagingen', heading: 'Uitdagingen' },
  { path: '/tips-werkzoekenden', link: 'Tips voor werkzoekenden', heading: 'Tips voor werkzoekenden' },
  { path: '/tips-werkgevers', link: 'Tips voor werkgevers', heading: 'Tips voor werkgevers' },
  { path: '/bronnen', link: 'Bronnen', heading: 'Bronnen en over deze site' },
  { path: '/contact', link: 'Contact', heading: 'Contact' },
]

test.describe('navigatie op desktop', () => {
  test.use({ viewport: { width: 1280, height: 800 } })

  for (const { path, link, heading } of pages) {
    test(`het menu leidt naar ${path}`, async ({ page }) => {
      await page.goto('/')
      const menu = page.getByRole('navigation', { name: 'Hoofdmenu' })
      await menu.getByRole('link', { name: link, exact: true }).click()

      await expect(page).toHaveURL(path)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading)
      await expect(page).toHaveTitle(/NeuroWerk/)
      await expect(menu.getByRole('link', { name: link, exact: true })).toHaveAttribute(
        'aria-current',
        'page',
      )
    })
  }

  test('de menuknop is verborgen en de links zijn zichtbaar', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('button', { name: 'Menu' })).toBeHidden()
    await expect(page.getByRole('link', { name: 'Voordelen', exact: true }).first()).toBeVisible()
  })

  test('een kaart op de startpagina leidt naar de juiste pagina', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('main').getByRole('link', { name: 'Uitdagingen' }).click()
    await expect(page).toHaveURL('/uitdagingen')
  })

  test('een rechtstreekse link werkt', async ({ page }) => {
    await page.goto('/tips-werkgevers')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Tips voor werkgevers')
  })

  test('een onbekend adres toont de 404-pagina met een weg terug', async ({ page }) => {
    await page.goto('/bestaat-niet')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pagina niet gevonden')
    await page.getByRole('link', { name: 'Ga terug naar de startpagina' }).click()
    await expect(page).toHaveURL('/')
  })

  test('de skiplink brengt je met het toetsenbord naar de inhoud', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    const skipLink = page.getByRole('link', { name: 'Ga naar de inhoud' })
    await expect(skipLink).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('main')).toBeFocused()
  })

  test('de focus gaat na het navigeren naar de nieuwe inhoud', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('navigation', { name: 'Hoofdmenu' }).getByRole('link', { name: 'Voordelen' }).click()
    await expect(page.getByRole('main')).toBeFocused()
  })
})

test.describe('mobiel menu', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('het menu is eerst dicht', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Menu' })
    await expect(toggle).toBeVisible()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('#hoofdmenu')).toBeHidden()
  })

  test('de knop opent en sluit het menu', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Menu' })

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('#hoofdmenu')).toBeVisible()

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('#hoofdmenu')).toBeHidden()
  })

  test('kiezen van een pagina navigeert en sluit het menu', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Menu' }).click()
    await page.locator('#hoofdmenu').getByRole('link', { name: 'Contact' }).click()

    await expect(page).toHaveURL('/contact')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Contact')
    await expect(page.locator('#hoofdmenu')).toBeHidden()
    await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false')
  })

  test('Escape sluit het menu en zet de focus terug op de knop', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Menu' })
    await toggle.click()
    await page.locator('#hoofdmenu').getByRole('link', { name: 'Home' }).focus()
    await page.keyboard.press('Escape')

    await expect(page.locator('#hoofdmenu')).toBeHidden()
    await expect(toggle).toBeFocused()
  })

  test('het menu werkt met alleen het toetsenbord', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Menu' }).focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('#hoofdmenu')).toBeVisible()

    await page.keyboard.press('Tab')
    await expect(page.locator('#hoofdmenu').getByRole('link', { name: 'Home' })).toBeFocused()
  })

  for (const { path } of pages) {
    test(`${path} scrollt niet horizontaal`, async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      )
      expect(overflow).toBe(false)
    })
  }
})
