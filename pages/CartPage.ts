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

  getProductItemTitle(index: number) {
    return this.page.locator(`[data-test="item-${index}-title-link"]`);
  }

}
