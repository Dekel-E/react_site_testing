import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

// SearchHarness class that encapsulates search functionality
// This class provides methods to interact with the search feature on the page
export class SearchHarness {
  readonly page: Page;
  readonly basePage: BasePage;
  readonly searchButton: Locator;
  readonly searchInput: Locator;
  readonly searchResults: Locator;
  readonly recentSearchesSection: Locator;
  readonly favoriteSearchesSection: Locator;
  readonly saveToFavoriteButton: Locator;

/**
 * @param page the Playwright Page object representing the current page
 * @param basePage the BasePage object representing the base page
 * Constructs a SearchHarness instance 
 * with locators for search elements.
 * Elements include:
 * - searchButton: the button to initiate search (only visible on small screens)
 * - searchInput: the input field for entering search queries
 * - searchResults: the container for displaying search results
 * - recentSearchesSection: the section displaying recent searches
 * - favoriteSearchesSection: the section displaying favorite searches
 * - saveToFavoriteButton: the button to save a search to favorites
 */
  constructor(page: Page, basePage: BasePage) {
    this.page = page;
    this.basePage = basePage;
    this.searchButton = page.locator('button:has-text("Search")').first();
    this.searchInput = page.locator('#docsearch-input');
    this.searchResults = page.locator('#docsearch-list, [role="listbox"]');
    this.recentSearchesSection = page.locator('#docsearch-list .DocSearch-Hit[id*="recentSearches"]');
    this.favoriteSearchesSection = page.locator('[id*="docsearch-favoriteSearches"]');
    this.saveToFavoriteButton = page.locator('button.DocSearch-Hit-action-button[title="Save this search"]');
  }

  /**
   * Checks if the search button is visible on the page - Only visible on small screens
   * @returns a boolean indicating if the search button is visible
   */
  async isSearchButtonVisible(): Promise<boolean> {
    return await this.searchButton.isVisible({ timeout: 5000 });
  }
/**
 * Checks if the search input field is visible on the page - usualy the case on larger screens
 * @returns a boolean indicating if the search input is visible
 */
  async isSearchInputVisible(): Promise<boolean> {
    return await this.searchInput.isVisible({ timeout: 5000 });
  }

  /**
   * Searches for the given text in the search input field.
   * Clicks the search button, fills the input with the text,
   * and waits for the first search result to be visible.
   * @param text the text to search for
   * @returns a boolean indicating if the search was successful
   */
  async searchForText(text: string): Promise<boolean> {
    try {
      await this.searchButton.click();
      await this.searchInput.fill(text);
      await expect(this.searchResults.first()).toBeVisible({ timeout: 15000 });
      return true;
    } catch (error) {
      console.log('Search function error:', error.message);
      return false;
    }
  }
/**
 * Checks if the recent searches section is visible
 * @returns a boolean indicating if the recent searches section is visible
 */
  async hasRecentSearches(): Promise<boolean> {
    return await this.recentSearchesSection.isVisible({ timeout: 5000 });
  }

  /**
   * Checks if the favorite searches section is visible- meaning the user has saved some searches
   * @returns a boolean indicating if the favorite searches section is visible
   */
  async hasFavoriteSearches(): Promise<boolean> {
    return await this.favoriteSearchesSection.isVisible({ timeout: 5000 });
  }


  /**
   * Checks if the save to favorite button is visible and if so clicks it.
   * @returns a boolean indicating if the save to favorite button is visible
   */
  async saveFirstRecentSearchToFavorite(): Promise<boolean> {
    try {
      if (await this.saveToFavoriteButton.isVisible({ timeout: 5000 })) {
        await this.saveToFavoriteButton.click();
        await this.page.waitForTimeout(500);
        return true;
      }
      console.log('Save to favorite button not found');
      return false;
    } catch (error) {
      console.log('Error clicking save button:', error.message);
      return false;
    }
  }
}