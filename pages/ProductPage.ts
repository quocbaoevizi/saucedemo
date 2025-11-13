import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class ProductPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get pageInstance(): Page {
        return this.page;
    }

    // Locators
    get cartLink(): Locator {
        return this.page.locator('[data-test="shopping-cart-link"]');
    }

    get cartBadge(): Locator {
        return this.page.locator('[data-test="shopping-cart-badge"]');
    }

    get sortDropdown(): Locator {
        return this.page.locator('[data-test="product-sort-container"]');
    }

    get menuButton(): Locator {
        return this.page.locator('button:has-text("Open Menu")');
    }

    get logoutLink(): Locator {
        return this.page.locator('[data-test="logout-sidebar-link"]');
    }

    getProductItem(index: number): Locator {
        return this.page.locator('[data-test="inventory-item-name"]').nth(index);
    }

    getProductItemByName(name: string): Locator {
        return this.page.locator('[data-test="inventory-item-description"]').filter({ hasText: name });
    }

    getAddToCartButton(index: number): Locator {
        return this.page.locator('[data-test="inventory-item-description"]')
            .nth(index).getByRole('button', { name: 'Add to cart' });
    }

    get inventoryContainer(): Locator {
        return this.page.locator('[data-test="inventory-container"]');
    }

    getProductItemLink(index: number): Locator {
        return this.page.locator(`[data-test="item-${index}-title-link"]`);
    }

    async clickProductItem(index: number): Promise<void> {
        await this.getProductItemLink(index).click();
    }

    async verifyPageIsDisplayed(): Promise<void> {
        await expect(this.inventoryContainer).toBeVisible();
    }

}
