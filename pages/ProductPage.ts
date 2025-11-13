import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class ProductPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Locators
    get cartLink() {
        return this.page.locator('[data-test="shopping-cart-link"]');
    }

    get cartBadge() {
        return this.page.locator('[data-test="shopping-cart-badge"]');
    }

    get menuButton() {
        return this.page.locator('button:has-text("Open Menu")');
    }

    get logoutLink() {
        return this.page.locator('[data-test="logout-sidebar-link"]');
    }

    get productItems() {
        return this.page.locator('[data-test="inventory-item"]');
    }

    getProductItem(index: number) {
        return this.page.locator(`[data-test="item-${index}-title-link"]`);
    }

    getProductDescription(index: number) {
        return this.page.locator('[data-test="inventory-item-description"]').nth(index);
    }

    getProductName(index: number) {
        return this.page.locator('[data-test="inventory-item-name"]').nth(index);
    }

    getAddToCartButton(index: number) {
        return this.page.locator('[data-test="inventory-item-description"]')
            .nth(index)
            .locator('button:has-text("Add to cart")');
    }

    // Navigation
    async navigateToCart() {
        await this.cartLink.click();
    }

    // Verification
    async isPageDisplayed(): Promise<boolean> {
        return this.isVisible('[data-test="inventory-container"]');
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
