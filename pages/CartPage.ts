import { Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class CartPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  get cartList() {
    return this.page.locator('[data-test="cart-list"]');
  }

  get productItems() {
    return this.page.locator('[data-test="inventory-item"]');
  }

  get removeButton() {
    return this.page.getByRole('button', { name: 'Remove' });
  }

  get continueShoppingButton() {
    return this.page.getByRole('button', { name: 'Continue Shopping' });
  }

  get checkoutButton() {
    return this.page.getByRole('button', { name: 'Checkout' });
  }

  getProductItemTitle(index: number) {
    return this.page.locator(`[data-test="item-${index}-title-link"]`);
  }

  async getCartItemNames(): Promise<string[]> {
    const itemTitles = this.page.locator('[data-test^="inventory-item-name"]');
    const count = await itemTitles.count();
    const itemNames: string[] = [];

    for (let i = 0; i < count; i++) {
      const name = await itemTitles.nth(i).textContent();
      if (name) {
        itemNames.push(name);
      }
    }

    return itemNames;
  }
}
