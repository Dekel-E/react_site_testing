import { test, expect } from '@playwright/test';
import { ReactHomePage } from '../Harness/ReactHomePage';
import { KEYBOARD_SHORTCUTS , THEMES , FIRST_ELEMENTS , KNOWN_SEARCH_TERMS,
   ARROW_KEYS_TEST} from'../constants';


test.describe('Keyboard Functionality Tests', () => {
  let homePage: ReactHomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new ReactHomePage(page);
    await homePage.goto();
    await homePage.waitForPageLoad();
  });

  test('Tab Navigation', async ({ page }) => {
  for (const text of FIRST_ELEMENTS) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300); // Allow time for focus to change
    await expect(page.locator(':focus')).toContainText(text);
  }
  await page.keyboard.press('Shift+Tab');
  await page.waitForTimeout(300); // Allow time for focus to change
  await expect(page.locator(':focus')).toContainText('React');
  });

  
 
  test('Escape key functionality', async ({ page }) => {
    // Test escape key with search
    const searchExists = await homePage.search.isSearchButtonVisible();
    if (searchExists) {
      await homePage.search.searchButton.click();
      await page.waitForTimeout(1000);
      const searchOpen = await homePage.search.isSearchInputVisible();
      if (searchOpen) {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);
        // Check if search closed
        const searchStillOpen = await homePage.search.isSearchInputVisible();
        expect(searchStillOpen).toBe(false);
      }
    }
  });

test('Arrow key navigation in search', async ({ page }) => {
  // Check if search is available, if not we skip the test
  const searchExists = await homePage.search.isSearchButtonVisible();
  if (!searchExists) {
    test.skip();
  }
  const searchTerms= KNOWN_SEARCH_TERMS;
  let searchedItemsCount = 0;
  //search for known term that gives results
  for (const term in KNOWN_SEARCH_TERMS) {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
   let searchWorked = await homePage.search.searchForText(term);
   await page.waitForTimeout(500);
   searchWorked ?  searchedItemsCount++ : test.fail();
  }
  expect(searchedItemsCount).toBeGreaterThan(2);
  await page.waitForTimeout(1000);
  await page.waitForSelector('.DocSearch-Hit', { timeout: 5000 });

  //select the first search result
  let previousSelectedId = await page.locator('.DocSearch-Hit[aria-selected="true"]').first().getAttribute('id');
  let navWorked = false

  for (let i = 0; i < ARROW_KEYS_TEST.length; i++) {
    const key = ARROW_KEYS_TEST[i];
    await page.keyboard.press(key);
    await page.waitForTimeout(500);

    const currentSelectedId = await page.locator('.DocSearch-Hit[aria-selected="true"]').first().getAttribute('id');
    currentSelectedId != previousSelectedId ? 
    navWorked = true : navWorked = false;
    previousSelectedId = currentSelectedId;
  }
  expect(navWorked).toBe(true); 
});


  test('Keyboard accessibility for theme toggle', async ({ page }) => {
    // Check if theme toggle button is visible
    const initialTheme = await homePage.themeToggleButton.getCurrentTheme();
    expect(initialTheme).toBe(THEMES.LIGHT); // Assuming initial theme is light
    await homePage.themeToggleButton.themeToggle.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    const newTheme = await homePage.themeToggleButton.getCurrentTheme();
    expect(newTheme).toBe(THEMES.DARK); // Check if theme changed to darK
  });

});

test.describe('Keyboard Shortcuts Tests', () => {
  let homePage: ReactHomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new ReactHomePage(page);
    await homePage.goto();
    await homePage.waitForPageLoad();
  });


   test('Search keyboard shortcuts', async ({ page }) => {

    const searchExists = await homePage.search.isSearchButtonVisible() 
      || await homePage.search.isSearchInputVisible();

    if (!searchExists) {
      console.log('Search not available - skipping search keyboard tests');
      test.skip();
    }
    let shortcutWorked = false;
    for (const shortcut of KEYBOARD_SHORTCUTS.SEARCH) {
      await page.keyboard.press(shortcut);
      await page.waitForTimeout(1000);
      // Check if search input is visible or focused
      const searchInputVisible = await homePage.search.isSearchInputVisible();
      const searchInputFocused = await page.evaluate(() => 
        document.activeElement === document.querySelector('#docsearch-input')
      );
      if (searchInputVisible || searchInputFocused) {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
        shortcutWorked = true;
      }
    }
    expect(shortcutWorked).toBe(true);
  });
  test('HOME', async ({ page }) => {
    let state = false
    await page.evaluate(() => window.scrollBy(0, 1000));
    const initialScrollY = await page.evaluate(() => window.scrollY);
    await page.keyboard.press(KEYBOARD_SHORTCUTS.HOME);
    await page.waitForTimeout(500);
    const newScrollY = await page.evaluate(() => window.scrollY);
    newScrollY == 0 ? state = true : state = false;
    expect(state).toBe(true);
  });
  test('END', async ({ page }) => {
    let state = false;
    const initialScrollY = await page.evaluate(() => window.scrollY);
    await page.keyboard.press(KEYBOARD_SHORTCUTS.END);
    await page.waitForTimeout(500);
    const newScrollY = await page.evaluate(() => window.scrollY);
    const documentHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    newScrollY>initialScrollY ? state = true : state = false;
    expect(state).toBe(true);
  });
  test('PAGE_UP', async ({ page }) => {
    let state = false;
    await page.evaluate(() => window.scrollBy(0, 1000));
    const initialScrollY = await page.evaluate(() => window.scrollY);
    await page.keyboard.press(KEYBOARD_SHORTCUTS.PAGE_UP);
    await page.waitForTimeout(500); 
    const newScrollY = await page.evaluate(() => window.scrollY);
    newScrollY < initialScrollY ? state = true : state = false;
    expect(state).toBe(true);
    
  });
  test('PAGE_DOWN', async ({ page }) => {
    let state = false;
    const initialScrollY = await page.evaluate(() => window.scrollY);
    await page.keyboard.press(KEYBOARD_SHORTCUTS.PAGE_DOWN);
    await page.waitForTimeout(500);
    const newScrollY = await page.evaluate(() => window.scrollY);
    newScrollY != initialScrollY ? state = true : state = false;
    expect(state).toBe(true);
  });

});
