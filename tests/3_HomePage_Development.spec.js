const { test, expect } = require('@playwright/test')

// Helper function to accept the privacy policy
async function acceptPrivacyPolicy (page) {
  const agreeButton = await page.$('#agreeButton')
  if (agreeButton) {
    await agreeButton.click()
    await page.waitForTimeout(1000) // Add a small delay to give time for the modal to close
  }
}

test('Homepage meets positive requirements', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await acceptPrivacyPolicy(page) // Add this line

  // Positive Test Cases
  expect(await page.evaluate(() => document.doctype.name)).toBe('html')
  expect(await page.getAttribute('html', 'lang')).toBeTruthy()
  expect(await page.title()).toContain('MyWebClass.org')
  expect(await page.getAttribute('meta[name="keywords"]', 'content')).toBeTruthy()
  expect(await page.getAttribute('meta[name="author"]', 'content')).toBeTruthy()
  expect(await page.getAttribute('meta[name="description"]', 'content')).toBeTruthy()
  expect(await page.getAttribute('meta[property="og:title"]', 'content')).toBeTruthy()
  expect(await page.getAttribute('meta[property="og:description"]', 'content')).toBeTruthy()
  expect(await page.getAttribute('meta[property="og:image"]', 'content')).toBeTruthy()
  // expect(await page.getAttribute('meta[property="og:url"]', 'content')).toBeTruthy()

  //  const ogUrlContent = await page.getAttribute('meta[property="og:url"]', 'content')
  //  console.log('og:url content:', ogUrlContent) // Add this line to print the content of the og:url meta tag
  //  expect(ogUrlContent).toBeTruthy()

  expect(await page.locator('head > link[rel="shortcut icon"]').getAttribute('href')).toBeTruthy()
  expect(await page.waitForSelector('nav[role="navigation"]')).toBeTruthy()
  expect(await page.waitForSelector('header[role="banner"] .navbar-brand')).toBeTruthy()
  expect(await page.waitForSelector('header[role="banner"] .navbar-nav')).toBeTruthy()
  expect(await page.waitForSelector('main .container.my-5 .row .col-lg-7 h1')).toBeTruthy()
  expect(await page.waitForSelector('main .container.my-5 .row .col-lg-7 p')).toBeTruthy()
  expect(await page.waitForSelector('main .container.my-5 .row .col-lg-7 button')).toBeTruthy()
  expect(await page.waitForSelector('main .container.my-5 .row .col-lg-4 img')).toBeTruthy()
  expect(await page.waitForSelector('footer .nav')).toBeTruthy()
  expect(await page.waitForSelector('footer .col-sm-3')).toBeTruthy()
  expect(await page.waitForSelector('footer form')).toBeTruthy()
})

test('Homepage meets negative requirements', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await acceptPrivacyPolicy(page) // Add this line

  // Negative Test Cases
  expect(await page.$('head > script[src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/css/bootstrap.min.css"]')).toBeFalsy()
  expect(await page.$('nav[role="banner"] .navbar-brand[href="#"]')).toBeFalsy()
  // expect(await page.$('main .container.my-5 .row .col-lg-7 .display-6')).toBeFalsy()
  // expect(await page.$('footer .col')).toBeFalsy()
  // expect(await page.$('footer .col-sm-3 h5')).toBeFalsy()
})
