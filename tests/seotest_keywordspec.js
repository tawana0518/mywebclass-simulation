import { test, expect } from '@playwright/test'

test.describe('MyWebClass.org tests', () => {
  test('SEO tests', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    // Test for keyword research
    const keywords = ['MyWebClass.org']
    const pageContent = await page.textContent('body')
    const hasKeywords = keywords.every(keyword => pageContent.includes(keyword))
    expect(hasKeywords).toBeTruthy()
  })
})
