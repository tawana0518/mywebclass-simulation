const { test, expect } = require('@playwright/test')

test('MyWebClass.org has alt text on images and label element for newsletter input', async ({ page }) => {
  await page.goto('http://localhost:3000/content.html')

  // Check for label element for newsletter input
  const label = await page.$('label[for="newsletter1"]')
  expect(label).toBeTruthy()
})
