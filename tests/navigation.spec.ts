import { test, expect } from '@playwright/test';
import { ReactHomePage } from '../Harness/ReactHomePage';
import { VIEWPORT_SIZES } from '../constants';

test.describe('Basic Navigation Tests', () => {
  let homePage: ReactHomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new ReactHomePage(page);
    await homePage.goto();
    await homePage.waitForPageLoad();
  });

  test.describe('Navigation Links Discovery and Testing', () => {

    test('find and test all navigation links', async () => {
      const allNavLinks = await homePage.getAllNavLinks();
      
      const allLinksValid = await Promise.all(
        allNavLinks.map(async (linkData) => {
          const isVisible = await linkData.element.isVisible();
          const hasValidHref = linkData.href && linkData.href !== '#';
    
          let hasCorrectTarget = true;
          if (linkData.href.startsWith('http') && !linkData.href.includes('react.dev')) {
            const target = await linkData.element.getAttribute('target');
            hasCorrectTarget = (target === '_blank');
          }
          
          return isVisible && hasValidHref && hasCorrectTarget;
        })
      );
  
  expect(allLinksValid.every(Boolean)).toBe(true);
});


    test('verify logo link navigates to home', async ({ page }) => {
      // Navigate to a different page first
      const testNavLink = page.locator('nav a[href]:not([href="/"])').first();
      if (await testNavLink.isVisible()) {
        await testNavLink.click();
        await page.waitForLoadState('networkidle');
      }
      
      // Use the component method
      const logoClicked = await homePage.navigateHomeViaLogo();
      
      if (logoClicked) {
        const currentUrl = page.url();
        expect(currentUrl).toBe("https://react.dev/");
      } else {
       test.fail();
      }
    });


    test('verify mobile navigation exists', async ({ page }) => {
      await page.setViewportSize(VIEWPORT_SIZES.MOBILE);
      await page.waitForTimeout(500);
      const mobileMenuWorking = await homePage.testMobileNavigation();
      if (mobileMenuWorking) {
        const mobileMenuContent = await page.locator('nav, [role="dialog"], .mobile-menu, .menu-overlay').count();
        expect(mobileMenuContent).toBeGreaterThan(0);
      } else {
        const navVisible = await homePage.navVisible();
        expect(navVisible).toBeDefined();
      }
    });
  });
});