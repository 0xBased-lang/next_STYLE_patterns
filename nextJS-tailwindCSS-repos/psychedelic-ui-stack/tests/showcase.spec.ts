import { test, expect } from '@playwright/test'
import path from 'path'

const SHOWCASE_URL = `file://${path.resolve(__dirname, '../INTERACTIVE-SHOWCASE-FIXED.html')}`

test.describe('Psychedelic UI Showcase - Interactive Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SHOWCASE_URL)
  })

  test('should load showcase page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Psychedelic UI - Interactive Showcase/)
    await expect(page.locator('h1')).toContainText('Psychedelic UI')
  })

  test.describe('Theme Switching', () => {
    test('should start with Conspiracy theme', async ({ page }) => {
      const htmlElement = page.locator('html')
      await expect(htmlElement).toHaveAttribute('data-theme', 'conspiracy')

      const themeIndicator = page.locator('#theme-name')
      await expect(themeIndicator).toHaveText('Conspiracy')
    })

    test('should switch to Neon Crypto theme', async ({ page }) => {
      await page.getByTestId('theme-neon-btn').click()

      const htmlElement = page.locator('html')
      await expect(htmlElement).toHaveAttribute('data-theme', 'neon')

      const themeIndicator = page.locator('#theme-name')
      await expect(themeIndicator).toHaveText('Neon Crypto')
    })

    test('should switch to Organic theme', async ({ page }) => {
      await page.getByTestId('theme-organic-btn').click()

      const htmlElement = page.locator('html')
      await expect(htmlElement).toHaveAttribute('data-theme', 'organic')

      const themeIndicator = page.locator('#theme-name')
      await expect(themeIndicator).toHaveText('Organic')
    })

    test('should switch to Experimental theme', async ({ page }) => {
      await page.getByTestId('theme-experimental-btn').click()

      const htmlElement = page.locator('html')
      await expect(htmlElement).toHaveAttribute('data-theme', 'experimental')

      const themeIndicator = page.locator('#theme-name')
      await expect(themeIndicator).toHaveText('Experimental')
    })

    test('should update themed components when switching themes', async ({ page }) => {
      // Get initial styles
      const themedCard = page.getByTestId('themed-card-1')
      const initialStyles = await themedCard.evaluate(el => {
        return window.getComputedStyle(el).backgroundColor
      })

      // Switch theme
      await page.getByTestId('theme-organic-btn').click()
      await page.waitForTimeout(500) // Wait for transition

      // Check styles changed
      const newStyles = await themedCard.evaluate(el => {
        return window.getComputedStyle(el).backgroundColor
      })

      expect(initialStyles).not.toBe(newStyles)
    })

    test('should switch between all 4 themes successfully', async ({ page }) => {
      const themes = ['conspiracy', 'neon', 'organic', 'experimental']

      for (const theme of themes) {
        await page.getByTestId(`theme-${theme}-btn`).click()
        const htmlElement = page.locator('html')
        await expect(htmlElement).toHaveAttribute('data-theme', theme)
      }
    })
  })

  test.describe('Modal Functionality', () => {
    test('should open modal when button is clicked', async ({ page }) => {
      const modal = page.getByTestId('modal-overlay')
      await expect(modal).toHaveClass(/hidden/)

      await page.getByTestId('open-modal-btn').click()
      await expect(modal).toHaveClass(/flex/)
    })

    test('should close modal when cancel button is clicked', async ({ page }) => {
      await page.getByTestId('open-modal-btn').click()
      const modal = page.getByTestId('modal-overlay')
      await expect(modal).toHaveClass(/flex/)

      await page.getByTestId('modal-cancel-btn').click()
      await expect(modal).toHaveClass(/hidden/)
    })

    test('should close modal when clicking outside', async ({ page }) => {
      await page.getByTestId('open-modal-btn').click()
      const modal = page.getByTestId('modal-overlay')
      await expect(modal).toHaveClass(/flex/)

      // Click on overlay (outside modal content)
      await modal.click({ position: { x: 10, y: 10 } })
      await expect(modal).toHaveClass(/hidden/)
    })

    test('should not close modal when clicking inside', async ({ page }) => {
      await page.getByTestId('open-modal-btn').click()
      const modal = page.getByTestId('modal-overlay')
      const modalContent = page.getByTestId('modal-content')

      await modalContent.click()
      await expect(modal).toHaveClass(/flex/)
    })

    test('modal input should be functional', async ({ page }) => {
      await page.getByTestId('open-modal-btn').click()
      const input = page.getByTestId('modal-input')

      await input.fill('Will AI surpass humans by 2030?')
      await expect(input).toHaveValue('Will AI surpass humans by 2030?')
    })

    test('modal should adapt to theme changes', async ({ page }) => {
      await page.getByTestId('open-modal-btn').click()
      const modalContent = page.getByTestId('modal-content')

      // Conspiracy theme
      let styles = await modalContent.evaluate(el => window.getComputedStyle(el).color)
      const conspiracyColor = styles

      // Switch to Organic theme
      await page.getByTestId('theme-organic-btn').click()
      await page.waitForTimeout(500)

      styles = await modalContent.evaluate(el => window.getComputedStyle(el).color)
      const organicColor = styles

      expect(conspiracyColor).not.toBe(organicColor)
    })
  })

  test.describe('Dropdown Menu', () => {
    test('should toggle dropdown when trigger is clicked', async ({ page }) => {
      const dropdown = page.getByTestId('dropdown-menu')
      await expect(dropdown).toHaveClass(/hidden/)

      await page.getByTestId('dropdown-trigger').click()
      await expect(dropdown).not.toHaveClass(/hidden/)

      await page.getByTestId('dropdown-trigger').click()
      await expect(dropdown).toHaveClass(/hidden/)
    })

    test('should close dropdown when clicking outside', async ({ page }) => {
      await page.getByTestId('dropdown-trigger').click()
      const dropdown = page.getByTestId('dropdown-menu')
      await expect(dropdown).not.toHaveClass(/hidden/)

      // Click outside
      await page.click('body', { position: { x: 500, y: 500 } })
      await expect(dropdown).toHaveClass(/hidden/)
    })

    test('should have all menu items visible', async ({ page }) => {
      await page.getByTestId('dropdown-trigger').click()

      await expect(page.getByTestId('dropdown-item-1')).toBeVisible()
      await expect(page.getByTestId('dropdown-item-2')).toBeVisible()
      await expect(page.getByTestId('dropdown-item-3')).toBeVisible()
      await expect(page.getByTestId('dropdown-logout')).toBeVisible()
    })

    test('menu items should have correct text', async ({ page }) => {
      await page.getByTestId('dropdown-trigger').click()

      await expect(page.getByTestId('dropdown-item-1')).toHaveText('Profile Settings')
      await expect(page.getByTestId('dropdown-item-2')).toHaveText('Preferences')
      await expect(page.getByTestId('dropdown-item-3')).toHaveText('Theme')
      await expect(page.getByTestId('dropdown-logout')).toHaveText('Log out')
    })
  })

  test.describe('Tooltip Interactions', () => {
    test('should show tooltip on hover', async ({ page }) => {
      const trigger = page.getByTestId('tooltip-trigger-1')
      const tooltip = page.getByTestId('tooltip-content-1')

      // Tooltip should be hidden initially
      await expect(tooltip).toHaveCSS('opacity', '0')

      // Hover over trigger
      await trigger.hover()

      // Tooltip should become visible
      await expect(tooltip).toHaveCSS('opacity', '1')
    })

    test('should hide tooltip when not hovering', async ({ page }) => {
      const trigger = page.getByTestId('tooltip-trigger-1')
      const tooltip = page.getByTestId('tooltip-content-1')

      await trigger.hover()
      await expect(tooltip).toHaveCSS('opacity', '1')

      // Move mouse away
      await page.mouse.move(0, 0)
      await page.waitForTimeout(300) // Wait for transition

      await expect(tooltip).toHaveCSS('opacity', '0')
    })

    test('should show correct tooltip content', async ({ page }) => {
      await page.getByTestId('tooltip-trigger-1').hover()
      await expect(page.getByTestId('tooltip-content-1')).toHaveText('This is a tooltip')

      await page.getByTestId('tooltip-trigger-2').hover()
      await expect(page.getByTestId('tooltip-content-2')).toHaveText('AI-powered prediction analysis')
    })
  })

  test.describe('Themed Components', () => {
    test('should have themed cards visible', async ({ page }) => {
      await expect(page.getByTestId('themed-card-1')).toBeVisible()
      await expect(page.getByTestId('themed-card-2')).toBeVisible()
      await expect(page.getByTestId('themed-card-3')).toBeVisible()
    })

    test('themed button should be clickable', async ({ page }) => {
      const button = page.getByTestId('themed-button-1')
      await expect(button).toBeVisible()
      await button.click()
      // Button should still be visible after click
      await expect(button).toBeVisible()
    })

    test('themed badge should display correctly', async ({ page }) => {
      const badge = page.getByTestId('themed-badge')
      await expect(badge).toBeVisible()
      await expect(badge).toHaveText('Active')
    })

    test('circular progress should be visible', async ({ page }) => {
      const progress = page.getByTestId('circular-progress')
      await expect(progress).toBeVisible()
    })
  })

  test.describe('Responsive Design', () => {
    test('should be responsive on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      await expect(page.locator('h1')).toBeVisible()
      await expect(page.getByTestId('theme-conspiracy-btn')).toBeVisible()
    })

    test('should be responsive on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })

      await expect(page.locator('h1')).toBeVisible()
      await expect(page.getByTestId('themed-card-1')).toBeVisible()
    })

    test('should be responsive on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 })

      await expect(page.locator('h1')).toBeVisible()
      await expect(page.getByTestId('themed-card-1')).toBeVisible()
    })
  })

  test.describe('Accessibility', () => {
    test('page should have proper heading structure', async ({ page }) => {
      const h1 = page.locator('h1')
      await expect(h1).toBeVisible()

      const h2 = page.locator('h2').first()
      await expect(h2).toBeVisible()

      const h3 = page.locator('h3').first()
      await expect(h3).toBeVisible()
    })

    test('buttons should be keyboard accessible', async ({ page }) => {
      // Focus on modal button
      await page.getByTestId('open-modal-btn').focus()
      await expect(page.getByTestId('open-modal-btn')).toBeFocused()

      // Press Enter to activate
      await page.keyboard.press('Enter')
      await expect(page.getByTestId('modal-overlay')).toHaveClass(/flex/)
    })

    test('form inputs should be keyboard accessible', async ({ page }) => {
      await page.getByTestId('open-modal-btn').click()
      const input = page.getByTestId('modal-input')

      await input.focus()
      await expect(input).toBeFocused()

      await page.keyboard.type('Test input')
      await expect(input).toHaveValue('Test input')
    })
  })
})

test.describe('Cross-Browser Theme Consistency', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SHOWCASE_URL)
  })

  test('themes should work consistently across browsers', async ({ page, browserName }) => {
    const themes = ['conspiracy', 'neon', 'organic', 'experimental']

    for (const theme of themes) {
      await page.getByTestId(`theme-${theme}-btn`).click()
      await page.waitForTimeout(300)

      const htmlElement = page.locator('html')
      await expect(htmlElement).toHaveAttribute('data-theme', theme)

      const themedCard = page.getByTestId('themed-card-1')
      await expect(themedCard).toBeVisible()

      console.log(`✓ ${theme} theme works on ${browserName}`)
    }
  })
})
