import { test, expect } from '@playwright/test';
import { ReactHomePage } from '../pages/ReactHomePage';
import { VIEWPORT_SIZES , THEMES } from '../constants';
import { exec } from 'child_process';


test.describe('Basic Layout Tests', () => {
  let homePage: ReactHomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new ReactHomePage(page);
    await homePage.goto();
    
    // Wait for multiple readiness indicators
    await homePage.waitForPageLoad();
    await expect(homePage.header).toBeVisible({ timeout: 10000 });
    await page.waitForLoadState('networkidle');

    // Verify critical page elements are ready
    await expect(page).toHaveTitle(/React/, { timeout: 5000 })
  });
    
 
  test('Check if the page has a header', async () => {
    const hasHeader = await homePage.hasHeader();
    expect(hasHeader, 'Page should have a header').toBe(true);

  });

  test('Check if the page has a footer', async () => {
    const hasFooter = await homePage.hasFooter();
    expect(hasFooter, 'Page should have a footer').toBe(true);
  });


test.describe('verify page layout for ', () => {
  
  test('Tablet', async ({ page }) => {
    // Resize to tablet size
    await page.setViewportSize(VIEWPORT_SIZES.TABLET);
     await page.reload()
    await page.waitForTimeout(1000); // Allow time for responsive layout to adjust
    await expect(page).toHaveScreenshot('tablet-layout.png', { fullPage: true });
  });

  test('Mobile', async ({ page }) => {
     // Resize to mobile size
    await page.setViewportSize(VIEWPORT_SIZES.MOBILE);
     await page.reload();
    await page.waitForTimeout(1000); // Allow time for responsive layout to adjust
    await expect(page).toHaveScreenshot('mobile-layout.png', { fullPage: true });
  });


test('Desktop', async ({ page }) => {
    await page.setViewportSize(VIEWPORT_SIZES.DESKTOP);
     await page.reload();
    await page.waitForTimeout(500); // Allow time for responsive layout to adjust
    await expect(page).toHaveScreenshot('desktop-layout.png', { fullPage: true });
  });

  
  
  test('Check theme toggle functionality', async ({ page }) => {
      const initialTheme = await homePage.themeToggleButton.getCurrentTheme();
      expect(initialTheme).toBe(THEMES.LIGHT);
      await homePage.themeToggleButton.toggleTheme();
      const newTheme = await homePage.themeToggleButton.getCurrentTheme();
      expect(newTheme).toBe(THEMES.DARK);
    }
  );
  });
})

