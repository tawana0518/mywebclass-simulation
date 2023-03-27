// test suite will check for Bootstrap CSS and JavaScript imports, responsive navigation bar implementation,
// main content area and footer with appropriate Bootstrap classes, and
// the Privacy Policy pop-up using a Bootstrap Modal.

const { test, expect } = require('@playwright/test')

test.describe('MyWebClass.org Bootstrap implementation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle') // Add this line to wait for the page to fully load
  })

  test('should have imported Bootstrap CSS and JavaScript', async ({ page }) => {
    const bootstrapCSS = await page.$('link[href*="bootstrap"]')
    expect(bootstrapCSS).toBeTruthy()

    const bootstrapJS = await page.$('script[src*="bootstrap"]')
    expect(bootstrapJS).toBeTruthy()
  })

  test('should have a responsive navigation bar with Bootstrap classes', async ({ page }) => {
  // Close Privacy Policy modal if it exists
    const agreeButton = await page.$('#agreeButton')
    if (agreeButton) {
      await agreeButton.click()
      await page.waitForTimeout(10000) // Add a small delay to give time for the modal to close
    }

    const navbar = await page.waitForSelector('.navbar', { state: 'visible', timeout: 10000 })
    expect(navbar).toBeTruthy()

    const navbarBrand = await page.waitForSelector('.navbar-brand', { state: 'visible', timeout: 10000 })
    expect(navbarBrand).toBeTruthy()

    await page.setViewportSize({ width: 320, height: 480 }) // Simulate a mobile device

    const navbarToggler = await page.waitForSelector('.navbar-toggler', { state: 'visible', timeout: 10000 })
    expect(navbarToggler).toBeTruthy()

    const navbarMenuItems = await page.$$('.navbar-nav .nav-item')
    for (const menuItem of navbarMenuItems) {
      const isVisible = await menuItem.evaluate(item => item.offsetParent !== null)
      expect(isVisible).toBeFalsy() // Menu items should be hidden initially
    }

    await navbarToggler.click()
    await page.waitForTimeout(500) // Add a small delay to give time for the animation

    for (const menuItem of navbarMenuItems) {
      const isVisible = await menuItem.evaluate(item => item.offsetParent !== null)
      expect(isVisible).toBeTruthy() // Menu items should be visible after clicking the toggler
    }
  })

  //  test('should have a main content area and footer with Bootstrap classes', async ({ page }) => {
  //    const mainContent = await page.waitForSelector('main', { state: 'visible', timeout: 20000 })
  //    expect(mainContent).toBeTruthy()
  //
  //    const mainContainer = await mainContent.waitForSelector('.container', { state: 'visible', timeout: 20000 })
  //    expect(mainContainer).toBeTruthy()
  //
  //    const footer = await page.waitForSelector('footer', { state: 'visible', timeout: 20000 })
  //    expect(footer).toBeTruthy()
  //
  //    const footerContainer = await footer.waitForSelector('.container', { state: 'visible', timeout: 20000 })
  //    expect(footerContainer).toBeTruthy()
  //
  //    const footerPadding = await footer.evaluate(footerElement => footerElement.classList.contains('py-5'))
  //    expect(footerPadding).toBeTruthy()
  //  })

  test('should have a Privacy Policy pop-up using Bootstrap Modal', async ({ page }) => {
    const privacyModal = await page.waitForSelector('#privacyModal', { state: 'attached', timeout: 10000 })
    expect(privacyModal).toBeTruthy()

    const modalContent = await privacyModal.waitForSelector('.modal-content', { state: 'visible', timeout: 10000 })
    expect(modalContent).toBeTruthy()

    const agreeButton = await modalContent.waitForSelector('#agreeButton', { state: 'visible', timeout: 10000 })
    expect(agreeButton).toBeTruthy()
  })
})
