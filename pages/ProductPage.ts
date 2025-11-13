import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class ProductPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Locators
    get cartLink() {
        return this.page.locator('[data-test="shopping-cart-link"]');
    }

    get menuButton() {
        return this.page.locator('button:has-text("Open Menu")');
    }

    get logoutLink() {
        return this.page.locator('[data-test="logout-sidebar-link"]');
    }

    get productItems() {
        return this.page.locator('[data-test="inventory-item-description"]');
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
