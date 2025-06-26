import {Page,Locator,expect} from '@playwright/test';


/**
 * a BasePage object that provides common methods for all pages.
 */
export class BasePage {
    readonly page: Page;
    readonly url: string;

    constructor(page: Page, url: string = '/') {
        this.page = page;
        this.url = url;
    }
    //go to page
    async goto() : Promise<void> {
        await this.page.goto(this.url);
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    //get the title of the page
    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    //check if some element is visible on given page
    async isElementVisibleV1(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    async isElementVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible({ timeout: 5000 });
    }

    //get text from given element
    async getElementText(locator: Locator): Promise<string> {
        return await locator.textContent() || '';
    }
}
