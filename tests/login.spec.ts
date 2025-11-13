import { test } from '@playwright/test';
import { AuthSteps } from '../steps/auth-steps';
import LoginPage from '../pages/LoginPage';

test.describe('Login Tests', () => {
  let authSteps: AuthSteps;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    authSteps = new AuthSteps(page, loginPage);
  });

  test('@C02 Verify that the user can log in into saucedemo.com with valid credentials', async () => {
    await authSteps.loginWithValidCredentials();
  });

  test('@C01 Verify that the error message is displayed when use log in with invalid credentials', async () => {
    await authSteps.loginWithInvalidCredentials('standard_user', 'wrongpassword');
  });

  test('@C03 Verify that user can logout ', async () => {
    await authSteps.loginWithValidCredentials();
    await authSteps.logout();
  });
});
