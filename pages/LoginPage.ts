import { Page } from '@playwright/test';
import BasePage from './BasePage';
import { config } from '../utils/config';

export default class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get usernameInput() {
        return this.page.locator('[data-test="username"]');
    }

    get passwordInput() {
        return this.page.locator('[data-test="password"]');
    }

    get loginButton() {
        return this.page.locator('[data-test="login-button"]');
    }

    get errorMessage() {
        return this.page.locator('[data-test="error"]');
    }

    // Actions
    async navigateToLoginPage(): Promise<void> {
        await this.navigateTo(config.baseUrl || '');
    }

    async login(username: string, password: string): Promise<void> {
        await this.type(this.usernameInput, username);
        await this.type(this.passwordInput, password);
        await this.click(this.loginButton);
    }

    // Assertions
    async verifyErrorMessageIsVisible(): Promise<boolean> {
        return this.isVisible(this.errorMessage);
    }

    async getErrorMessageText(): Promise<string> {
        return this.getText(this.errorMessage);
    }

    // Verification
    async verifyLoginButtonIsVisible(): Promise<boolean> {
        return this.isVisible(this.loginButton);
    }
}
