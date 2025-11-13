import { expect, Page } from "@playwright/test";
import CheckoutStepOnePage from "../pages/CheckoutStepOnePage";
import CheckoutStepTwoPage from "../pages/CheckoutStepTwoPage";
import CheckoutCompletePage from "../pages/CheckoutCompletePage";

export class CheckoutSteps {
  private checkoutStepOnePage: CheckoutStepOnePage;
  private checkoutStepTwoPage: CheckoutStepTwoPage;
  private checkoutCompletePage: CheckoutCompletePage;

  constructor(page: Page) {
    this.checkoutStepOnePage = new CheckoutStepOnePage(page);
    this.checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    this.checkoutCompletePage = new CheckoutCompletePage(page);
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

  async clickFinishButton(): Promise<void> {
    await this.checkoutStepTwoPage.finishButton.click();
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

  async verifyStepTwoPageIsDisplayed(): Promise<void> {
    await expect(this.checkoutStepTwoPage.title).toBeVisible();
    await expect(this.checkoutStepTwoPage.title).toHaveText('Checkout: Overview');
  }

  async verifyCheckoutComplete(): Promise<void> {
    await expect(this.checkoutCompletePage.title).toBeVisible();
    await expect(this.checkoutCompletePage.title).toHaveText('Checkout: Complete!');
    await expect(this.checkoutCompletePage.titleComplete).toBeVisible();
    await expect(this.checkoutCompletePage.titleComplete).toHaveText('Thank you for your order!');
  }
}
