const { test, expect } = require('@playwright/test')

// Helper function to accept the privacy policy
async function acceptPrivacyPolicy (page) {
  const agreeButton = await page.$('#agreeButton')
  if (agreeButton) {
    await agreeButton.click()
    await page.waitForTimeout(1000) // Add a small delay to give time for the modal to close
  }
}

test('MyWebClass.org is Google Analytics and GDPR compliant', async ({ page }) => {
// Check for explicit user consent
  await page.goto('http://localhost:3000/')
  await acceptPrivacyPolicy(page) // Add this line
  const cookieBanner = await page.$('text=Privacy and Cookies Policy')
  expect(cookieBanner).toBeTruthy()

  // Check for access and erasure rights
  //  const accountLink = await page.$('text=My Account')
  //  await accountLink.click()
  //  const deleteAccountButton = await page.$('text=Delete Account')
  //  expect(deleteAccountButton).toBeTruthy()

  // Check for GDPR compliance with a privacy policy
  await page.waitForSelector('text=Privacy and Cookies Policy') // Add this line to wait for the element
  const privacyPolicyLink = await page.$('text=Privacy and Cookies Policy')
  await privacyPolicyLink.click()

  const policySections = await page.$$eval('h2', headings => headings.map(h => h.textContent))
  expect(policySections).toContain('Information we collect')
  expect(policySections).toContain('How we use your information')
  expect(policySections).toContain('Sharing of Information')
  expect(policySections).toContain('Security Measures')
  expect(policySections).toContain('Accessibility Policy')
  expect(policySections).toContain('Data retention and security')
  expect(policySections).toContain('Your rights')
  expect(policySections).toContain('Changes to This Policy')

  // Check for security measures
  const secureConnection = page.url().startsWith('https://')
  if (!page.url().startsWith('http://localhost')) {
    expect(secureConnection).toBeTruthy()
  }
})
