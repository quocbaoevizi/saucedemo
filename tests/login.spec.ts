import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import { config } from '../utils/config';

test.describe('Login Tests', () => {
  test('should display error message when logging in with wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();

    await loginPage.login(
      config.username,
      'wrongpassword'
    );

    expect(await loginPage.verifyErrorMessageIsVisible()).toBeTruthy();

    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');
  });

});
