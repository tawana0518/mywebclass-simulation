/* global localStorage */
import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/privacy.html')
  await page.getByRole('button', { name: 'Agree', exact: true }).click()

  // Retrieve the privacyPolicyAgreed item from local storage
  const privacyPolicyAgreed = await page.evaluate(() => {
    return localStorage.getItem('privacyPolicyAgreed')
  })

  // Check if privacyPolicyAgreed is set in local storage
  expect(privacyPolicyAgreed).toBeTruthy()
})
