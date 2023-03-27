
import { test, expect } from '@playwright/test'

// Positive test cases
test('Privacy Policy: Check if the Privacy Policy page exists and is accessible from the main page', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await acceptPrivacyPolicy(page) // Add this line
  await page.click('text=Privacy and Cookies Policy')
  const privacyPolicyUrl = await page.url()
  expect(privacyPolicyUrl).toContain('/privacy.html')
})

// Helper function to accept the privacy policy
async function acceptPrivacyPolicy (page) {
  const agreeButton = await page.$('#agreeButton')
  if (agreeButton) {
    await agreeButton.click()
    await page.waitForTimeout(1000) // Add a small delay to give time for the modal to close
  }
}

test('Privacy Policy: Validate that the Privacy Policy page contains clear sections about information collection, usage, sharing, security, accessibility, data retention, user rights, and updates', async ({ page }) => {
  await page.goto('http://localhost:3000/privacy.html')
  const policySections = await page.$$eval('h2', headings => headings.map(h => h.textContent))
  expect(policySections).toContain('Information we collect')
  expect(policySections).toContain('How we use your information')
  expect(policySections).toContain('Sharing of Information')
  expect(policySections).toContain('Security Measures')
  expect(policySections).toContain('Accessibility Policy')
  expect(policySections).toContain('Data retention and security')
  expect(policySections).toContain('Your rights')
  expect(policySections).toContain('Changes to This Policy')
})

test('Accessibility: Ensure that the main page and Privacy Policy page have proper heading structure and use semantic HTML for accessibility', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  const mainHeadings = await page.$$eval('h1', headings => headings.map(h => h.textContent))
  expect(mainHeadings).toContain('Revolutionize your teaching')

  await page.goto('http://localhost:3000/privacy.html')
  const policyHeadings = await page.$$eval('h1, h2', headings => headings.map(h => h.textContent))
  expect(policyHeadings).toContain('Privacy Policy')
  expect(policyHeadings).toContain('Information we collect')
})

// Negative test cases
test('Privacy Policy: Check if there is a privacy pop-up or cookie consent banner on the main page or the Privacy Policy page (Expected: Not present)', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await acceptPrivacyPolicy(page)
  const cookieBanner = await page.$('text=Privacy and Cookies Policy')
  expect(cookieBanner).toBeTruthy()

  await page.goto('http://localhost:3000/privacy.html')
  const privacyPopup = await page.$('text=Agree')
  expect(privacyPopup).toBeTruthy()
})

test('Privacy Policy: Verify if the provided HTML files explicitly mention or implement GDPR or other regional regulations (Expected: Not present)', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  const mainHtml = await page.content()
  expect(mainHtml).not.toContain('GDPR')

  await page.goto('http://localhost:3000/privacy.html')
  const policyHtml = await page.content()
  expect(policyHtml).not.toContain('GDPR')
})

test('Accessibility: Check if ARIA attributes are used in the main page and Privacy Policy page (Expected: 3 attributes)', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  const ariaAttributes = await page.$$eval('[role]', elements => elements.map(e => e.getAttribute('role')))
  expect(ariaAttributes).toHaveLength(3) // Change this line

  await page.goto('http://localhost:3000/privacy.html')
  const policyAriaAttributes = await page.$$eval('[role]', elements => elements.map(e => e.getAttribute('role')))
  expect(policyAriaAttributes).toHaveLength(2)
})
