import { Page, Locator,expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { SearchHarness } from './SearchHarness'
import { ThemeComponent } from './ThemeHarness';
import { NavigationComponent } from './NavHarness';
;
export class ReactHomePage extends BasePage {
//page elements
readonly header: Locator;
readonly footer: Locator;
readonly search: SearchHarness;
readonly themeToggleButton: ThemeComponent;
readonly navigation: NavigationComponent;



//search elements - might and will these move to a separate SearchPage class in the future
// readonly searchButton: Locator;
// readonly searchInput: Locator;
// readonly searchResults: Locator;
// readonly recentSearchesSection: Locator;
// readonly favoriteSearchesSection: Locator;
// readonly saveToFavoriteButton: Locator;
//readonly themeToggle: Locator;



  constructor(page: Page) {
    super(page,'/');
    this.search = new SearchHarness(page, this);
    this.header = page.locator('header, nav, [role="banner"]').first();
    this.footer = page.locator('footer, [role="contentinfo"]').first();
    this.themeToggleButton = new ThemeComponent(page);
    this.navigation = new NavigationComponent(page, this);
    

  }

  //check if header exists
  async hasHeader(): Promise<boolean> {
    return await this.isElementVisible(this.header);
  }

  //check if footer exists and is visible
  async hasFooter(): Promise<boolean> {
    return await this.isElementVisible(this.footer);
  }

  //try to click on theme toggle button
  async toggleTheme(): Promise<void> {
    return await this.themeToggleButton.toggleTheme(); //click on the theme toggle button
  }
  // Navigation-related methods
  async navVisible(): Promise<boolean> {
    return await this.navigation.isNavigationVisible();
  }
/**
 * Gets all navigation links on the page.
 * @returns {Promise<NavLink[]>} Returns an array of all navigation links found on the page.
 */
  async getAllNavLinks() {
    return await this.navigation.getAllNavigationLinks();
  }
/**
 * Tests if the mobile navigation menu can be opened.
 * @returns {Promise<boolean>} Returns true if the mobile navigation menu can be opened, false otherwise.
 */
  async testMobileNavigation(): Promise<boolean> {
    return await this.navigation.clickMobileMenu();
  }
/**
 * Navigates to the home page by clicking the logo.
 * @returns {Promise<boolean>} Returns true if the navigation was successful, false otherwise.
 */
  async navigateHomeViaLogo(): Promise<boolean> {
    return await this.navigation.clickLogoToGoHome();
  }
/**
 * Searches for the specified text on the page.
 * @param text The text to search for.
 * @returns {Promise<boolean>} Returns true if the text was found, false otherwise.
 */
    async searchForText(text: string): Promise<boolean> {
    return await this.search.searchForText(text);
  }
/**
 * Checks if the recent searches section is visible.
 * @returns {Promise<boolean>} Returns true if the recent searches section is visible, false otherwise.
 */
  async hasRecentSearches(): Promise<boolean> {
    return await this.search.hasRecentSearches();
  }
/**
 * Checks if the favorite searches section is visible.
 * @returns {Promise<boolean>} Returns true if the favorite searches section is visible, false otherwise.
 */
  async hasFavoriteSearches(): Promise<boolean> {
    return await this.search.hasFavoriteSearches();
  }
  
/**
 * Checks if the favorite searches section is visible.
 * @returns {Promise<boolean>} Returns true if the favorite searches section is visible, false otherwise.
 */
  async saveFirstRecentSearchToFavorite(): Promise<boolean> {
    return await this.search.saveFirstRecentSearchToFavorite();

  }}
  
  
