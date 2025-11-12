import { Page } from '@playwright/test';
import BasePage from './BasePage';
import { config } from '../utils/config';

export default class LoginPage extends BasePage {
    // Locators
    private readonly usernameInput = '[data-test="username"]';
    private readonly passwordInput = '[data-test="password"]';
    private readonly loginButton = '[data-test="login-button"]';
    private readonly errorMessage = '[data-test="error"]';

    constructor(page: Page) {
        super(page);
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
