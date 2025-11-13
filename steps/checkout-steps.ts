import { expect, Page } from "@playwright/test";
import CheckoutStepOnePage from "../pages/CheckoutStepOnePage";

export class CheckoutSteps {
  private checkoutStepOnePage: CheckoutStepOnePage;

  constructor(page: Page) {
    this.checkoutStepOnePage = new CheckoutStepOnePage(page);
  }

  // Actions
  async enterFirstName(firstName: string): Promise<void> {
    await this.checkoutStepOnePage.firstNameInput.fill(firstName);
  }

  async enterLastName(lastName: string): Promise<void> {
    await this.checkoutStepOnePage.lastNameInput.fill(lastName);
  }

  async enterZipCode(zipCode: string): Promise<void> {
    await this.checkoutStepOnePage.zipCodeInput.fill(zipCode);
  }

  async clickContinueButton(): Promise<void> {
    await this.checkoutStepOnePage.continueButton.click();
  }

  async clickCancelButton(): Promise<void> {
    await this.checkoutStepOnePage.cancelButton.click();
  }

  // Verifications
  async verifyPageIsDisplayed(): Promise<void> {
    await expect(this.checkoutStepOnePage.title).toBeVisible();
    await expect(this.checkoutStepOnePage.title).toHaveText('Checkout: Your Information');
    await expect(this.checkoutStepOnePage.firstNameInput).toBeVisible();
    await expect(this.checkoutStepOnePage.lastNameInput).toBeVisible();
    await expect(this.checkoutStepOnePage.zipCodeInput).toBeVisible();
    await expect(this.checkoutStepOnePage.continueButton).toBeVisible();
  }

  async verifyFirstNameRequiredError(): Promise<void> {
    const errorMessage = this.checkoutStepOnePage.pageInstance.locator('h3[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Error: First Name is required');
  }

  async verifyLastNameRequiredError(): Promise<void> {
    const errorMessage = this.checkoutStepOnePage.pageInstance.locator('h3[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Error: Last Name is required');
  }

  async verifyZipCodeRequiredError(): Promise<void> {
    const errorMessage = this.checkoutStepOnePage.pageInstance.locator('h3[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Error: Postal Code is required');
  }
}
