import { test, expect } from '@playwright/test'

test.describe('MyWebClass.org internationalization', () => {
  let page

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto('http://localhost:3000')
  })

  test.afterEach(async () => {
    await page.close()
  })

  test('should display special characters correctly and set the lang attribute dynamically', async () => {
    // Wait for the privacy modal to load
    const privacyModalSelector = '#privacyModal'
    await page.waitForSelector(privacyModalSelector)

    // Close the privacy modal
    const closeModalButton = await page.$('.btn-close')
    await closeModalButton.click()

    // Set the Accept-Language header and navigate to the website
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en' })
    await page.goto('http://localhost:3000')

    // Check if the lang attribute of the HTML tag is set to "en"
    const langAttribute = await page.getAttribute('html', 'lang')
    expect(langAttribute).toBe('en', 'The lang attribute of the HTML tag is not set to "en".')

    //    For future test- Check if special characters are displayed correctly
    //    const specialChars = 'こんにちは世界! Hola mundo! Привет мир!'
    //    const specialCharsElement = await page.$(`text="${specialChars}"`)
    //    expect(specialCharsElement).toBeTruthy()
  })

  test('should not display special characters correctly when character encoding is changed', async () => {
    // Wait for the privacy modal to load
    const privacyModalSelector = '#privacyModal'
    await page.waitForSelector(privacyModalSelector)

    // Close the privacy modal
    const closeModalButton = await page.$('.btn-close')
    await closeModalButton.click()

    // Navigate to a different version of the site with a different character encoding
    await page.goto('http://localhost:3000/iso-8859-1')

    //   For Future test - Check if special characters are not displayed correctly
    //    const specialChars = 'こんにちは世界! Hola mundo! Привет мир!'
    //    const specialCharsElement = await page.$(`text="${specialChars}"`)
    //    expect(specialCharsElement).toBeFalsy()
  })
})
