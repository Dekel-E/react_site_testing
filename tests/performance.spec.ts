import { test, expect } from '@playwright/test';
import { ReactHomePage } from '../pages/ReactHomePage';
import {MAX_TIME_TO_LOAD} from '../constants';

// Performance tests for the React home page
//kinda blank for now, but can be expanded later
test.describe('Performance Tests', () => {
  let homePage: ReactHomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new ReactHomePage(page);
        await homePage.goto();
        await homePage.waitForPageLoad();
    });

  
  test('Page load performance', async ({ page }) => {
  const startTime = Date.now();
  await homePage.goto();
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(MAX_TIME_TO_LOAD); 
});
});

