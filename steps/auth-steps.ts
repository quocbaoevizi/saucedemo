import { expect, Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import { config } from '../utils/config';
import { ProductSteps } from './product-steps';

export class AuthSteps {
  private productSteps: ProductSteps;
  constructor(
    private page: Page,
    private loginPage: LoginPage
  ) {
    this.productSteps = new ProductSteps(page);
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
    expect(this.productSteps.verifyProductPageIsDisplayed());
  }

  async verifyLoginButtonIsVisible() {
    await expect(this.loginPage.verifyLoginButtonIsVisible()).resolves.toBeTruthy();
  }

  async logout() {
    await this.productSteps.logout();
    await this.verifyLoginButtonIsVisible();
  }
}