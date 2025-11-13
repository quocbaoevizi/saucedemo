import BasePage from "./BasePage";
import { Page } from "@playwright/test";

export default class CheckoutCompletePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get title() {
    return this.page.locator('[data-test="title"]');
  }

  get titleComplete() {
    return this.page.locator('[data-test="complete-header"]');
  }
}