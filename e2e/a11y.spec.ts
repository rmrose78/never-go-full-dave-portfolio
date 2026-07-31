import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'desktop', width: 1440, height: 900 },
]

// Add more routes here as real pages/sections are built, and add
// interactive-open-state cases (menus, modals) alongside them.
for (const viewport of viewports) {
  test.describe(`home page @ ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } })

    test('has no automatically detectable accessibility violations', async ({ page }) => {
      await page.goto('/')

      const results = await new AxeBuilder({ page }).analyze()

      expect(results.violations).toEqual([])
    })
  })
}
