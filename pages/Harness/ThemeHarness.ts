
import { Page, Locator } from '@playwright/test';
import { THEMES, THEME_TOGGLE_BUTTON} from '../../constants';
/**
 * ThemeComponent class provides methods to interact with the theme toggle functionality of a web page.
 * It allows toggling between dark and light themes, checking the visibility of the theme toggle button
 */
export class ThemeComponent {
  readonly page: Page;
  readonly themeToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.themeToggle = page.locator(THEME_TOGGLE_BUTTON).first();
  }
  
/**
 * Toggles the theme between dark and light modes.
 */
  async toggleTheme(): Promise<void> {
      await this.themeToggle.click();
      await this.page.waitForTimeout(500);
  }

/**
 * Checks if the theme toggle button is visible on the page.
 * @returns {Promise<boolean>} Returns true if the theme toggle button is visible, false otherwise.
 */
  async isThemeToggleVisible(): Promise<boolean> {
    return await this.themeToggle.isVisible({ timeout: 5000 });
  }
  
/**
 * Gets the current theme of the page.
 * @returns {Promise<'dark' | 'light' | 'unknown'>} Returns the current theme of the page.
 * It checks if the document's root element has the 'dark' class to determine the theme.
 */
  async getCurrentTheme(): Promise<'dark' | 'light' | 'unknown'> {
    try {
      const isDark = await this.page.evaluate(() => 
        document.documentElement.classList.contains('dark')
      );
      return isDark ? 'dark' : 'light';
    } catch {
      return 'unknown';
    }
  }
}