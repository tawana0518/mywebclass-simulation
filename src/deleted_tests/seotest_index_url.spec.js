import { test, expect } from '@playwright/test'

test.describe('MyWebClass.org tests', () => {
  test('SEO tests', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    // Test for URL structure
    const pageUrl = page.url()
    const pageUrlPathname = new URL(pageUrl).pathname
    const hasProperUrlStructure = Boolean(pageUrl && !pageUrl.includes('%20') && pageUrlPathname === '/')
    expect(hasProperUrlStructure).toBeTruthy()
  })
})
