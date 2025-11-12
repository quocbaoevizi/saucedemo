import { test, expect } from '@playwright/test';
import { AuthSteps } from '../steps/auth-steps';
import LoginPage from '../pages/LoginPage';

test.describe('Login Tests', () => {
  let authSteps: AuthSteps;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    authSteps = new AuthSteps(page, loginPage);
  });

  test('should login successfully with valid credentials and display products', async ({ page }) => {
    await authSteps.loginWithValidCredentials();
    
    // Additional verifications
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('should display error message when logging in with wrong password', async () => {
    await authSteps.loginWithInvalidCredentials('standard_user', 'wrongpassword');
    
    expect(await loginPage.verifyErrorMessageIsVisible()).toBeTruthy();
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');
  });

  test('should login and then logout successfully', async () => {
    await authSteps.loginWithValidCredentials();
    await authSteps.logout();
  });
});
