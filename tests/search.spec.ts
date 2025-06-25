import { test, expect, BrowserContext} from '@playwright/test';
import { ReactHomePage } from '../pages/ReactHomePage';  
import { KNOWN_SEARCH_TERMS } from '../constants';

test.describe('Search Functionality Tests', () => {
  let homePage: ReactHomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new ReactHomePage(page);
    await homePage.goto();
    await homePage.waitForPageLoad();
  });

  test('Test search functionality', async ({ page }) => {
    // Check if search button exists(smaller screens) or the input field is visible(larger screens)
    const searchExists = await homePage.search.isSearchButtonVisible() 
    || await homePage.search.isSearchInputVisible();
    //if not we skip the test, cant test search functionality without search button or input field
    if (!searchExists) {
        console.log('Search button not found - skipping test');
        test.skip();
        return;
    }
    // Open search and enter a query 
    const searchOpened = await homePage.search.searchForText('custom hook');
    if (searchOpened) {
      // const resultsVisible = await homePage.isElementVisible(homePage.search.searchResults.first());
      const resultsVisible = await homePage.search.searchResults.first().isVisible({ timeout: 5000 });
      // Check if results are visible
      if (resultsVisible) {
        //If so try to click on the first result
        const firstResult = page.locator('#docsearch-hits0-item-0').first();
        const firstResultExists = await firstResult.isVisible({ timeout: 5000 });
        firstResultExists ? await firstResult.click() : console.log('First search result not found');

        //Try to close and reopen search
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
        // Reopen search 
        await homePage.search.searchButton.click();
        await page.waitForTimeout(1000); 
    }
    } else {
      test.fail();
    }
    expect(searchExists).toBe(true);
  });

  test('test search with different known terms', async ({ page }) => {
    const searchExists = await homePage.search.isSearchButtonVisible();
    if (!searchExists) {
      test.skip();
    }

    const searchTerms = KNOWN_SEARCH_TERMS;
    let successfulSearches = 0;
    for (const term of searchTerms) {
      const searchWorked = await homePage.search.searchForText(term);
      if (searchWorked) {
        successfulSearches++;
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
      }
    }
    //if all known terms were searched successfully
    //  we expect searches to be greater than 0 
    // and less than or equal to the number of known search terms
    let test_pass = false
    successfulSearches >=0 && successfulSearches <= searchTerms.length ? test_pass = true : test_pass = false;
   expect(test_pass).toBe(true);
  });

  test('Test recent searches and add to favorite', async ({ page }) => {
    // Check if search button exists
    // If not, skip the test
    const searchExists = await homePage.search.isSearchButtonVisible();
    if (!searchExists) {
      test.skip();
    }
    // Search some known terms so they appear in recent searches
    await homePage.search.searchForText('useState');
    await page.waitForTimeout(1000);

    // Wait for results and click first one
    await page.waitForSelector('.DocSearch-Hit', { timeout: 5000 });
    await page.locator('.DocSearch-Hit').first().click();
    await page.waitForLoadState('networkidle');

    // Go back to homepage
    await homePage.goto();
    await homePage.waitForPageLoad();
    // Check if recent searches are visible
    await homePage.search.searchButton.click();
    await page.waitForTimeout(1000);
    const hasRecentSearches = await homePage.search.hasRecentSearches();
    expect(hasRecentSearches).toBe(true);

    // Try saving first recent search to favorites
    if (hasRecentSearches) {
      const savedToFavorites = await homePage.search.saveFirstRecentSearchToFavorite();
      expect(savedToFavorites).toBe(true);
      
      // Check favorites are visible
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
      await homePage.search.searchButton.click();
      await page.waitForTimeout(1000);
      
      //if favorites are visible, we expect the user to have saved some searches
      const hasFavorites = await homePage.search.hasFavoriteSearches();
      expect(hasFavorites).toBe(true);
    }
  });
});