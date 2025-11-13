import { expect } from '@playwright/test';
import ProductDetailPage from '../pages/ProductDetailPage';

export class ProductDetailSteps {
  constructor(private productDetailPage: ProductDetailPage) {}

  async verifyPageIsDisplayed(): Promise<void> {
    await expect(this.productDetailPage.backToProductsButton).toBeVisible();
    await expect(this.productDetailPage.productName).toBeVisible();
    await expect(this.productDetailPage.productDescription).toBeVisible();
    await expect(this.productDetailPage.productPrice).toBeVisible();
  }

  async verifyProductDetails(expectedName: string): Promise<void> {
    const actualName = await this.productDetailPage.productName.textContent();
    expect(actualName).toBe(expectedName);
  }

  async navigateBackToProducts(): Promise<void> {
    await this.productDetailPage.navigateBackToProducts();
  }
}
