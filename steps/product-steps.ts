import { expect, Page } from '@playwright/test';
import ProductPage from '../pages/ProductPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import { ProductDetailSteps } from './product-detail-steps';

export class ProductSteps {
  private productPage: ProductPage;
  private cartPage: CartPage;
  public productDetailSteps: ProductDetailSteps;

  constructor(page: Page) {
    this.productPage = new ProductPage(page);
    this.cartPage = new CartPage(page);
    this.productDetailSteps = new ProductDetailSteps(new ProductDetailPage(page));
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
      const itemName = await this.productPage.getProductItem(index).textContent();
      if (itemName) itemNames.push(itemName);
      await this.productPage.getAddToCartButton(index).click();
    }

    return itemNames;
  }

  // Verifications
  async verifyCartBadgeCount(expectedCount: number): Promise<void> {
    await expect(this.productPage.cartBadge).toHaveText(expectedCount.toString());
  }

  async verifyProductPageIsDisplayed(): Promise<void> {
    const isDisplayed = await this.productPage.inventoryContainer.isVisible();
    expect(isDisplayed).toBeTruthy();
  }

  async verifyProductItemReadyToAddToCart(itemName: string): Promise<void> {
    const productItemLocator = this.productPage.getProductItemByName(itemName);
    const isDisplayed = await productItemLocator.getByRole('button', { name: 'Add to cart' }).isVisible();
    expect(isDisplayed).toBeTruthy();
  }

  // Product Details methods
  async getProductItemText(index: number): Promise<string | null> {
    return await this.productPage.getProductItemLink(index).textContent();
  }

  async viewProductDetails(index: number): Promise<void> {
    await this.productPage.clickProductItem(index);
    await this.productDetailSteps.verifyPageIsDisplayed();
  }
}
