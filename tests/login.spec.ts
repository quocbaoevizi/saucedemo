import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from '../steps/auth-steps';
import LoginPage from '../pages/LoginPage';

test.describe('Login Tests', () => {
  test('should login successfully with valid credentials and display products', async ({ page }) => {
    const { productPage } = await loginAsStandardUser(page);
    
    // Additional verifications if needed
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('should display error message when logging in with wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login('standard_user', 'wrongpassword');

    expect(await loginPage.verifyErrorMessageIsVisible()).toBeTruthy();
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');
  });

  test('should login and then logout successfully', async ({ page }) => {
    const { loginPage, productPage } = await loginAsStandardUser(page);
    await productPage.logout();
    await expect(loginPage.verifyLoginButtonIsVisible()).resolves.toBeTruthy();
  });
});
