import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class ProductPage extends BasePage {
    // Locators
    private readonly menuButton = 'button:has-text("Open Menu")';
    private readonly logoutLink = '[data-test="logout-sidebar-link"]';

    constructor(page: Page) {
        super(page);
    }

    // Actions
    async logout(): Promise<void> {
        await this.click(this.menuButton);
        await this.click(this.logoutLink);
    }

    // Verification
    async verifyPageIsDisplayed(): Promise<boolean> {
        return this.isVisible('[data-test="inventory-container"]');
    }
}
