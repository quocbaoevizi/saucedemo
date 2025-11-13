import { Page, expect } from "@playwright/test";
import CartPage from "../pages/CartPage";
import BasePage from "../pages/BasePage";

export class CartSteps extends BasePage {
  private cartPage: CartPage;

  constructor(page: Page) {
    super(page);
    this.cartPage = new CartPage(page);
  }

  async goBackToProductPage() {
    await this.goBack();
  }

  async clickContinueShoppingButton() {
    await this.cartPage.continueShoppingButton.click();
  }

  async clickCheckoutButton() {
    await this.cartPage.checkoutButton.click();
  }

  async verifyCartItemCount(expectedCount: number): Promise<void> {
    await expect(this.cartPage.productItems).toHaveCount(expectedCount);
  }

  async verifyCartContainsItems(itemNames: string[]): Promise<void> {
    for (let i = 0; i < itemNames.length; i++) {
      await expect(this.cartPage.getProductItemTitle(i)).toHaveText(itemNames[i]);
    }
  }

  async removeProductFromCart(index: number): Promise<string | null> {
    const productName = await this.cartPage.getProductItemTitle(index).textContent();
    await this.cartPage.removeButton.nth(index).click();
    return productName;
  }

  async verifyItemNotInCart(itemName: string): Promise<void> {
    const cartItems = await this.cartPage.getCartItemNames();
    expect(cartItems).not.toContain(itemName);
  }
}