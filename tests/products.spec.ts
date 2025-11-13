import { test, expect } from '@playwright/test';
import { AuthSteps } from '../steps/auth-steps';
import LoginPage from '../pages/LoginPage';

test.describe('Product Page Tests', () => {
  let authSteps: AuthSteps;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    authSteps = new AuthSteps(page, loginPage);
    await authSteps.loginWithValidCredentials();
  });

  test('@C04 Verify that the user can add multiple products to cart', async ({ page }) => {
    // Add first product to cart
    await page.locator('[data-test="inventory-item-description"]')
      .nth(1)
      .getByRole('button', { name: 'Add to cart' })
      .click();

    // Add second product to cart
    await page.locator('[data-test="inventory-item-description"]')
      .nth(2)
      .getByRole('button', { name: 'Add to cart' })
      .click();

    // Get product names for verification
    const itemName1 = await page.locator('[data-test="inventory-item-description"]')
      .nth(1)
      .locator('[data-test="inventory-item-name"]')
      .textContent();

    const itemName2 = await page.locator('[data-test="inventory-item-description"]')
      .nth(2)
      .locator('[data-test="inventory-item-name"]')
      .textContent();

    // Navigate to cart
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Verify cart page elements
    await expect(page.locator('[data-test="item-0-title-link"]')).toBeVisible();
    await expect(page.locator('[data-test="item-1-title-link"]')).toBeVisible();
    await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();

    // Verify cart badge shows 2 items
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    // Verify exactly 2 items in cart
    const cartItems = page.locator('[data-test="inventory-item"]');
    await expect(cartItems).toHaveCount(2);
    // Verify correct items are in cart
    expect(await page.locator('[data-test="item-0-title-link"]').textContent()).toBe(itemName1);
    expect(await page.locator('[data-test="item-1-title-link"]').textContent()).toBe(itemName2);
  });
});