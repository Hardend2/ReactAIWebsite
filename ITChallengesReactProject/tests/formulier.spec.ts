import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

const errors = {
  name: 'Vul je naam in.',
  email: 'Vul een geldig e-mailadres in, bijvoorbeeld naam@voorbeeld.be.',
  message: 'Schrijf een bericht van minstens 10 tekens.',
}
const acceptedText = 'Alles is goed ingevuld.'

function fields(page: Page) {
  return {
    name: page.getByLabel('Naam'),
    email: page.getByLabel('E-mailadres'),
    message: page.getByLabel('Bericht'),
    submit: page.getByRole('button', { name: 'Controleer en verstuur' }),
    status: page.getByRole('status'),
    trap: page.locator('#website'),
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto('/contact')
})

test.describe('formuliervalidatie', () => {
  test('een leeg formulier toont alle fouten en focust het eerste veld', async ({ page }) => {
    const form = fields(page)
    await form.submit.click()

    await expect(page.getByText(errors.name)).toBeVisible()
    await expect(page.getByText(errors.email)).toBeVisible()
    await expect(page.getByText(errors.message)).toBeVisible()
    await expect(form.name).toBeFocused()
    await expect(form.status).toBeEmpty()
  })

  test('foutvelden zijn gekoppeld aan hun foutmelding', async ({ page }) => {
    const form = fields(page)
    await form.submit.click()

    await expect(form.email).toHaveAttribute('aria-invalid', 'true')
    await expect(form.email).toHaveAttribute('aria-describedby', 'email-error')
    await expect(page.locator('#email-error')).toHaveText(errors.email)
  })

  test('alleen spaties tellen niet als naam', async ({ page }) => {
    const form = fields(page)
    await form.name.fill('   ')
    await form.email.fill('naam@voorbeeld.be')
    await form.message.fill('Dit is een geldig bericht.')
    await form.submit.click()

    await expect(page.getByText(errors.name)).toBeVisible()
    await expect(form.name).toBeFocused()
  })

  for (const email of ['geenapenstaart', 'naam@', 'naam@domein', 'na am@voorbeeld.be']) {
    test(`"${email}" wordt geweigerd als e-mailadres`, async ({ page }) => {
      const form = fields(page)
      await form.name.fill('Sam')
      await form.email.fill(email)
      await form.message.fill('Dit is een geldig bericht.')
      await form.submit.click()

      await expect(page.getByText(errors.email)).toBeVisible()
      await expect(form.email).toBeFocused()
      await expect(form.status).toBeEmpty()
    })
  }

  test('een te kort bericht wordt geweigerd', async ({ page }) => {
    const form = fields(page)
    await form.name.fill('Sam')
    await form.email.fill('naam@voorbeeld.be')
    await form.message.fill('Te kort')
    await form.submit.click()

    await expect(page.getByText(errors.message)).toBeVisible()
    await expect(form.message).toBeFocused()
  })

  test('een fout verdwijnt nadat je ze verbetert', async ({ page }) => {
    const form = fields(page)
    await form.submit.click()
    await expect(page.getByText(errors.name)).toBeVisible()

    await form.name.fill('Sam')
    await form.email.fill('naam@voorbeeld.be')
    await form.message.fill('Dit is een geldig bericht.')
    await form.submit.click()

    await expect(page.getByText(errors.name)).toBeHidden()
    await expect(form.name).toHaveAttribute('aria-invalid', 'false')
    await expect(form.status).toContainText(acceptedText)
  })

  test('een geldig formulier wordt aanvaard en leeggemaakt', async ({ page }) => {
    const form = fields(page)
    await form.name.fill('Sam')
    await form.email.fill('naam@voorbeeld.be')
    await form.message.fill('Dit is een geldig bericht.')
    await form.submit.click()

    await expect(form.status).toContainText(acceptedText)
    await expect(form.name).toHaveValue('')
    await expect(form.email).toHaveValue('')
    await expect(form.message).toHaveValue('')
  })

  test('het formulier verstuurt geen gegevens naar een server', async ({ page }) => {
    const form = fields(page)
    const requests: string[] = []
    page.on('request', (request) => {
      if (request.method() !== 'GET') requests.push(request.url())
    })

    await form.name.fill('Sam')
    await form.email.fill('naam@voorbeeld.be')
    await form.message.fill('Dit is een geldig bericht.')
    await form.submit.click()
    await expect(form.status).toContainText(acceptedText)

    expect(requests).toEqual([])
    expect(page.url()).not.toContain('naam')
  })
})

test.describe('honeypot-spamfilter', () => {
  test('een ingevuld honeypot-veld houdt een geldig bericht tegen', async ({ page }) => {
    const form = fields(page)
    await form.name.fill('Spambot')
    await form.email.fill('bot@voorbeeld.be')
    await form.message.fill('Koop nu onze spamproducten.')
    await form.trap.fill('https://spam.example')
    await form.submit.click()

    await expect(form.status).toHaveText('Bedankt.')
    await expect(form.status).not.toContainText(acceptedText)
    await expect(form.name).toHaveValue('')
  })

  test('een bot krijgt geen foutmeldingen te zien', async ({ page }) => {
    const form = fields(page)
    await form.trap.fill('https://spam.example')
    await form.submit.click()

    await expect(form.status).toHaveText('Bedankt.')
    await expect(page.getByText(errors.name)).toBeHidden()
    await expect(page.getByText(errors.email)).toBeHidden()
    await expect(page.getByText(errors.message)).toBeHidden()
  })

  test('na een tegengehouden bericht is het honeypot-veld weer leeg', async ({ page }) => {
    const form = fields(page)
    await form.trap.fill('https://spam.example')
    await form.submit.click()
    await expect(form.status).toHaveText('Bedankt.')
    await expect(form.trap).toHaveValue('')
  })

  test('het veld staat buiten beeld en is onbereikbaar voor mensen', async ({ page }) => {
    const form = fields(page)
    await expect(form.trap).toHaveAttribute('tabindex', '-1')
    await expect(form.trap).toHaveAttribute('autocomplete', 'off')
    await expect(page.locator('.form-trap')).toHaveAttribute('aria-hidden', 'true')

    const box = await form.trap.boundingBox()
    expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(0)

    await form.name.focus()
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await expect(form.submit).toBeFocused()
  })

  test('een mens die het veld niet ziet, wordt niet tegengehouden', async ({ page }) => {
    const form = fields(page)
    await form.name.fill('Sam')
    await form.email.fill('naam@voorbeeld.be')
    await form.message.fill('Dit is een geldig bericht.')
    await form.submit.click()

    await expect(form.status).toContainText(acceptedText)
  })
})
