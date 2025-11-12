import { expect, Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';
import { config } from '../utils/config';

export class AuthSteps {
  private productPage: ProductPage;

  constructor(
    private page: Page,
    private loginPage: LoginPage
  ) {
    this.productPage = new ProductPage(page);
  }

  async loginWithValidCredentials() {
    await this.loginPage.navigateToLoginPage();
    await this.loginPage.login(
      config.username,
      config.password
    );
    await this.verifyLoginIsSuccessful();
  }

  async loginWithInvalidCredentials(username: string, password: string) {
    await this.loginPage.navigateToLoginPage();
    await this.loginPage.login(username, password);
    await this.verifyInvalidLoginError();
  }

  async verifyInvalidLoginError() {
    expect(await this.loginPage.verifyErrorMessageIsVisible()).toBeTruthy();
    const errorText = await this.loginPage.getErrorMessageText();
    expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');
  }

  async verifyLoginIsSuccessful() {
    await expect(this.productPage.verifyPageIsDisplayed()).resolves.toBeTruthy();
    await expect(this.page.getByText('Swag Labs')).toBeVisible();
    await expect(this.page.locator('[data-test="inventory-container"]')).toBeVisible();
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  async verifyLoginButtonIsVisible() {
    await expect(this.loginPage.verifyLoginButtonIsVisible()).resolves.toBeTruthy();
  }

  async logout() {
    await this.productPage.logout();
    await this.verifyLoginButtonIsVisible();
  }
}