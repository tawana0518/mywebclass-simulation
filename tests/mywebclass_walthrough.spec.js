import { test } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  const page1Promise = page.waitForEvent('popup')
  await page.locator('#privacyModal').getByRole('link', { name: 'Privacy and Cookies Policy' }).click()
  const page1 = await page1Promise
  await page1.getByRole('button', { name: 'Agree', exact: true }).click()
  await page1.getByRole('link', { name: 'Home' }).click()
  await page1.getByRole('button', { name: 'Start Here' }).click()
  await page1.getByRole('link', { name: 'Content Template' }).click()
  await page1.getByRole('link', { name: 'Our Story' }).click()
  await page1.getByRole('link', { name: 'MyWebClass.org' }).click()
})
