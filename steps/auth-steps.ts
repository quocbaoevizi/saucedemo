import { expect } from '@playwright/test';
import { Page } from '@playwright/test';
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
  }

  async verifyLoginIsSuccessful() {
    await expect(this.productPage.verifyPageIsDisplayed()).resolves.toBeTruthy();
  }

  async verifyLoginButtonIsVisible() {
    await expect(this.loginPage.verifyLoginButtonIsVisible()).resolves.toBeTruthy();
  }

  async logout() {
    await this.productPage.logout();
    await this.verifyLoginButtonIsVisible();
  }
}