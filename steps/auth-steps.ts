import { Page, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';
import { config } from '../utils/config';

export async function loginAsStandardUser(page: Page): Promise<{ loginPage: LoginPage, productPage: ProductPage }> {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login(
        config.username,
        config.password
    );

    // Verify login was successful
    await expect(productPage.verifyPageIsDisplayed()).resolves.toBeTruthy();

    return { loginPage, productPage };
}

export async function logout(page: Page, productPage: ProductPage, loginPage: LoginPage): Promise<void> {
    await productPage.logout();
    await expect(loginPage.verifyLoginButtonIsVisible()).resolves.toBeTruthy();
}