import { test, expect } from '@playwright/test'

test.describe('MyWebClass.org tests', () => {
  test('SEO tests', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    // Test for meta tags
    const pageTitle = await page.title()
    const pageMetaDescription = await page.$eval('meta[name="description"]', el => el.content)
    const pageMetaKeywords = await page.$eval('meta[name="keywords"]', el => el.content)
    const hasMetaTags = Boolean(pageTitle && pageMetaDescription && pageMetaKeywords)
    expect(hasMetaTags).toBeTruthy()
  })
})
