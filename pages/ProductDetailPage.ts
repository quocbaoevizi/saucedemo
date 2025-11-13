import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class ProductDetailPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Locators
    get backToProductsButton(): Locator {
        return this.page.locator('[data-test="back-to-products"]');
    }

    get productName(): Locator {
        return this.page.locator('[data-test="inventory-item-name"]');
    }

    get productDescription(): Locator {
        return this.page.locator('[data-test="inventory-item-desc"]');
    }

    get productPrice(): Locator {
        return this.page.locator('[data-test="inventory-item-price"]');
    }

    get addToCartButton(): Locator {
        return this.page.locator('button:has-text("Add to cart")');
    }

    // Actions
    async navigateBackToProducts(): Promise<void> {
        await this.backToProductsButton.click();
    }

    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    // Verifications
    async isPageDisplayed(): Promise<boolean> {
        return await this.backToProductsButton.isVisible();
    }

    async toHaveURL(pattern: string | RegExp) {
        const currentUrl = this.page.url();
        if (pattern instanceof RegExp) {
            expect(currentUrl).toMatch(pattern);
        } else {
            expect(currentUrl).toContain(pattern);
        }
    }
}
