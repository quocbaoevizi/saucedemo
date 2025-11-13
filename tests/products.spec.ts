import { test } from '@playwright/test';
import { AuthSteps } from '../steps/auth-steps';
import LoginPage from '../pages/LoginPage';
import { ProductSteps } from '../steps/product-steps';

test.describe('Product Page Tests', () => {
  let authSteps: AuthSteps;
  let loginPage: LoginPage;
  let productSteps: ProductSteps;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    authSteps = new AuthSteps(page, loginPage);
    productSteps = new ProductSteps(page);
    await authSteps.loginWithValidCredentials();
    await productSteps.verifyProductPageIsDisplayed();
  });

  test('@C04 Verify that the user can add multiple products to cart', async () => {
    let itemIndexes: number[] = [1, 2];
    let itemNames: string[] = [];
    await test.step('Add products to cart', async () => {
      itemNames = await productSteps.addProductsToCart(itemIndexes);
    });

    await test.step('Verify cart badge shows correct count', async () => {
      await productSteps.verifyCartBadgeCount(itemIndexes.length);
    });

    await test.step('Navigate to cart', async () => {
      await productSteps.navigateToCart();
    });

    await test.step('Verify cart contents', async () => {
      await productSteps.verifyCartItemCount(itemIndexes.length);
      await productSteps.verifyCartContainsItems(itemNames);
    });
  });
});