import { expect, Page } from '@playwright/test';
import ProductPage from '../pages/ProductPage';

export class ProductSteps {
  private productPage: ProductPage;

  constructor(page: Page) {
    this.productPage = new ProductPage(page);
  }

  // Actions
  async navigateToCart() {
    await this.productPage.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.productPage.menuButton.click();
    await this.productPage.logoutLink.click();
  }

  async addProductsToCart(indexes: number[]): Promise<string[]> {
    const itemNames: string[] = [];

    for (const index of indexes) {
      const itemName = await this.productPage.getProductName(index).textContent();
      if (itemName) itemNames.push(itemName);
      await this.productPage.getAddToCartButton(index).click();
    }

    return itemNames;
  }

  // Verifications
  async verifyCartItemCount(expectedCount: number): Promise<void> {
    await expect(this.productPage.productItems).toHaveCount(expectedCount);
  }

  async verifyCartBadgeCount(expectedCount: number): Promise<void> {
    await expect(this.productPage.cartBadge).toHaveText(expectedCount.toString());
  }

  async verifyCartContainsItems(itemNames: string[]): Promise<void> {
    for (let i = 0; i < itemNames.length; i++) {
      await expect(this.productPage.getProductItem(i)).toHaveText(itemNames[i]);
    }
  }

  async verifyProductPageIsDisplayed(): Promise<void> {
    const isDisplayed = await this.productPage.inventoryContainer.isVisible();
    expect(isDisplayed).toBeTruthy();
  }
}
