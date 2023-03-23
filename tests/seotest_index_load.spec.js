import { test, expect } from '@playwright/test'

test.describe('MyWebClass.org tests', () => {
  test('SEO tests', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    // Test for fast load times
    const pageLoadTime = await page.evaluate(() => window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart)
    const isFastLoading = pageLoadTime <= 5000
    expect(isFastLoading).toBeTruthy()
  })
})
