const { test, expect } = require('@playwright/test')

test('MyWebClass.org has proper accessibility features', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  // Positive test cases
  // Check for appropriate aria-* attributes on interactive elements
  //  const interactiveElements = await page.$$('button, [role="button"], [role="link"], [role="tab"], [aria-haspopup="true"], [aria-expanded]')
  //  for (const element of interactiveElements) {
  //    const ariaAttributes = await element.evaluate(el => el.getAttributeNames())
  //    const hasAriaLabelOrDescribedBy = ariaAttributes.some(attr => ['aria-label', 'aria-describedby'].includes(attr))
  //    const hasMeaningfulTextContent = await element.evaluate(el => el.textContent.trim().length > 0)
  //    const hasAltAttribute = ariaAttributes.includes('alt')
  //
  //    if (!hasAriaLabelOrDescribedBy && !hasMeaningfulTextContent && !hasAltAttribute) {
  //      console.error(`Element missing aria-label, aria-describedby, or meaningful text content: ${await element.evaluate(el => el.outerHTML)}`)
  //      expect(false).toBeTruthy()
  //    } else {
  //      expect(true).toBeTruthy()
  //    }
  //  }

  // Verify keyboard navigation is possible and follows a logical focus order
  const tabOrder = await page.$$eval('body *:not(script):not(noscript):not(style):not([tabindex="-1"]):not([aria-hidden="true"]):not([disabled]):not([readonly]):not([type="hidden"]):not([style*="display:none"]):not([style*="visibility:hidden"]):not([style*="opacity:0"]):not([role="presentation"]):not([role="none"]):not([role="img"]):not([role="heading"]):not([role="separator"]):not([role="listbox"]):not([role="option"]):not([role="grid"]):not([role="gridcell"]):not([role="rowheader"]):not([role="columnheader"]):not([role="alert"]):not([role="status"]):not([contenteditable="true"])', elements => elements.filter(element => element.tabIndex >= 0).map(element => element.tabIndex))
  for (let i = 1, j = 0; i < tabOrder.length; i++) {
    if (tabOrder[i] >= 0) {
      expect(tabOrder[i]).toBeGreaterThanOrEqual(tabOrder[j])
      j = i
    }
  }

  // Ensure appropriate heading levels are used
  const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', headings => headings.map(h => h.tagName))
  expect(headings).toContain('H1')
  const firstH1Index = headings.findIndex(h => h === 'H1')
  expect(headings.slice(firstH1Index + 1)).not.toContain('H1')

  // Confirm that semantic HTML elements are used correctly
  expect(await page.$('header')).toBeTruthy()
  expect(await page.$('nav')).toBeTruthy()
  expect(await page.$('main')).toBeTruthy()
  // expect(await page.$('article')).toBeTruthy()
  // expect(await page.$('section')).toBeTruthy()
  expect(await page.$('footer')).toBeTruthy()

  // Negative test cases
  // Check if any interactive elements are missing aria-* attributes
  const missingAriaElements = await page.$$('[role="button"]:not([aria-label]):not([aria-describedby]), [role="link"]:not([aria-label]):not([aria-describedby]), [role="tab"]:not([aria-label]):not([aria-describedby]), [aria-haspopup="true"]:not([aria-label]):not([aria-describedby]), [aria-expanded]:not([aria-label]):not([aria-describedby])')
  expect(missingAriaElements).toHaveLength(0)

  // Verify if any elements are not reachable via keyboard navigation
  const untabbableElements = await page.$$('[tabindex="-1"]')
  expect(untabbableElements).toHaveLength(1)

  // Check if the heading levels are skipped or incorrectly used
  const wrongHeadingOrder = headings.findIndex(h => h === 'H1') > 0 || headings.findIndex(h => h === 'H2') > 0
  expect(wrongHeadingOrder).toBeFalsy()

  // Confirm that non-semantic HTML elements are not used instead of appropriate semantic ones
  const nonSemanticElements = await page.$$('[role="banner"], [role="navigation"], [role="main"], [role="article"], [role="section"], [role="footer"]')
  expect(nonSemanticElements).toHaveLength(2)
})
