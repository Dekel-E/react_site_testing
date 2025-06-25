import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

// This file defines the NavigationComponent class for handling navigation-related actions on a web page.

//we defince a NavLink interface to represent a navigation link with its properties
export interface NavLink {
  element: Locator;
  href: string;
  text: string;
  selector: string;
}
/**
 * NavigationComponent class provides methods to interact with the navigation elements of a web page.
 */
export class NavigationComponent {
  readonly page: Page;
  readonly basePage: BasePage;
  readonly mainNav: Locator;
  readonly mobileMenuButton: Locator;
  readonly logoLink: Locator;

  constructor(page: Page, basePage: BasePage) {
    this.page = page;
    this.basePage = basePage;
    this.mainNav = page.locator('nav, [role="navigation"]').first();
    this.mobileMenuButton = page.locator('button[aria-label*="menu" i], button[aria-label*="Menu"]').first();
    this.logoLink = page.locator('a[href="/"], a:has(svg), a:has(img)').first();
  }

    /**
     * Retrieves all navigation links from the page.
     * @returns {Promise<NavLink[]>} An array of NavLink objects containing link details.
     */
  async getAllNavigationLinks(): Promise<NavLink[]> {
    const navSelectors = [
      'nav a[href]',
      'header a[href]',
      '[role="navigation"] a[href]'
    ];

    const allNavLinks: NavLink[] = [];
    
    for (const selector of navSelectors) {
      const links = await this.page.locator(selector).all();
      for (const link of links) {
        const href = await link.getAttribute('href');
        const text = await link.textContent();
        const isVisible = await link.isVisible();
        
        if (href && isVisible && text?.trim()) {
          allNavLinks.push({
            element: link,
            href: href,
            text: text.trim(),
            selector: selector
          });
        }
      }
    }
    
    return allNavLinks;
  }
/**
 * Retrieves all internal navigation links from the page.
 * @returns {Promise<Locator[]>} An array of Locators for internal navigation links.
 */
  async getInternalNavigationLinks(): Promise<Locator[]> {
    return await this.page.locator('nav a[href]:not([href^="http"]):not([href^="#"]):not([target="_blank"])').all();
  }
/**
 * Retrieves all footer links from the page.
 * @returns {Promise<Locator[]>} An array of Locators for footer links.
 */
  async getFooterLinks(): Promise<Locator[]> {
    await this.page.locator('footer').last().scrollIntoViewIfNeeded();
    return await this.page.locator('footer a[href]').all();
  }
/**
 * Checks if the main navigation is visible.
 * @returns {Promise<boolean>} Returns true if the main navigation is visible, false otherwise.
 */
  async isNavigationVisible(): Promise<boolean> {
    return await this.basePage.isElementVisible(this.mainNav);
  }
/**
 * Checks if the mobile menu button is visible.
 * @returns {Promise<boolean>} Returns true if the mobile menu button is visible, false otherwise.
 */
  async isMobileMenuVisible(): Promise<boolean> {
    return await this.basePage.isElementVisible(this.mobileMenuButton);
  }
/**
 * 
 * @returns {Promise<boolean>} Returns true if the mobile menu button is visible and clickable, false otherwise.
 */
  async clickMobileMenu(): Promise<boolean> {
    try {
      if (await this.isMobileMenuVisible()) {
        await this.mobileMenuButton.click();
        await this.page.waitForTimeout(1000);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
/**
 * Click on the logo to go home
 * @returns {Promise<boolean>} Returns true if the logo link is visible and clickable, false otherwise.
 */
  async clickLogoToGoHome(): Promise<boolean> {
    try {
      if (await this.basePage.isElementVisible(this.logoLink)) {
        await this.logoLink.click();
        await this.page.waitForLoadState('networkidle');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
/**
 * Validates the accessibility of a navigation link.
 * @param element Locator for the link element to validate accessibility
 * @returns {Promise<boolean>} Returns true if the link is accessible, false otherwise.
 */
  async validateLinkAccessibility(element: Locator): Promise<boolean> {
    try {
      await element.focus();
      const isFocused = await element.evaluate((el: HTMLElement) => document.activeElement === el);
      
      const ariaLabel = await element.getAttribute('aria-label');
      const title = await element.getAttribute('title');
      const textContent = await element.textContent();
      
      const hasAccessibleName = ariaLabel || title || (textContent && textContent.trim());
      
      return isFocused && !!hasAccessibleName;
    } catch {
      return false;
    }
  }
}