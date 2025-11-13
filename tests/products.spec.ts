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
    // Add products to cart and get their names
    const itemIndexes = [1, 2]; // Indexes of products to add
    const itemNames = await productSteps.addProductsToCart(itemIndexes);

    // Verify cart badge shows correct count
    await productSteps.verifyCartBadgeCount(itemIndexes.length);

    // Navigate to cart
    await productSteps.navigateToCart();

    // Verify cart contents
    await productSteps.verifyCartItemCount(itemIndexes.length);
    await productSteps.verifyCartContainsItems(itemNames);
  });
});