import BasePage from "./BasePage";
import { Page, expect } from "@playwright/test";

export default class CheckoutStepOnePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get firstNameInput() {
    return this.page.locator('[data-test="firstName"]');
  }

  get lastNameInput() {
    return this.page.locator('[data-test="lastName"]');
  }

  get zipCodeInput() {
    return this.page.locator('[data-test="postalCode"]');
  }

  get continueButton() {
    return this.page.locator('[data-test="continue"]');
  }

  get title() {
    return this.page.locator('[data-test="title"]');
  }

  get cancelButton() {
    return this.page.locator('[data-test="cancel"]');
  }

  get errorMessages() {
    return this.page.locator('[data-test="error"]');
  }

}
