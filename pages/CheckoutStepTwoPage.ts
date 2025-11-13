import { Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class CheckoutStepTwoPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get title() {
    return this.page.locator('[data-test="title"]');
  }

  get finishButton() {
    return this.page.locator('[data-test="finish"]');
  }
}
