import { test, expect, Page } from '@playwright/test';
import { AuthSteps } from '../steps/auth-steps';
import LoginPage from '../pages/LoginPage';
import { ProductSteps } from '../steps/product-steps';
import { CartSteps } from '../steps/cart-steps';

test.describe('Cart Page Tests', () => {
  let authSteps: AuthSteps;
  let loginPage: LoginPage;
  let productSteps: ProductSteps;
  let cartSteps: CartSteps;
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    loginPage = new LoginPage(page);
    authSteps = new AuthSteps(page, loginPage);
    productSteps = new ProductSteps(page);
    cartSteps = new CartSteps(page);
    await authSteps.loginWithValidCredentials();
    await productSteps.verifyProductPageIsDisplayed();
  });

  test('@C08 Verify that the user can remove product from Cart page', {
    tag: ['@C08', '@Cart']
  }, async () => {
    const itemIndexes = [1, 2, 3]; // Add 3 items to the cart
    let itemNames: string[] = [];
    let removedItemName: string | null = null;

    await test.step('Add multiple products to cart', async () => {
      itemNames = await productSteps.addProductsToCart(itemIndexes);
    });

    await test.step('Verify cart badge shows correct count', async () => {
      await productSteps.verifyCartBadgeCount(itemIndexes.length);
    });

    await test.step('Navigate to cart', async () => {
      await productSteps.navigateToCart();
    });

    await test.step('Verify cart contains all added items', async () => {
      await cartSteps.verifyCartItemCount(itemIndexes.length);
    });

    await test.step('Remove one product from cart', async () => {
      removedItemName = await cartSteps.removeProductFromCart(0);
    });

    await test.step('Verify cart is updated after removal', async () => {
      await cartSteps.verifyCartItemCount(itemIndexes.length - 1);

      if (removedItemName) {
        await cartSteps.verifyItemNotInCart(removedItemName);
      } else {
        throw new Error('Failed to get removed item name');
      }
    });
  });

  test('@C09 Verify that the user can view cart page', {
    tag: ['@C09', '@Cart']
  }, async () => {
    const itemIndexes = [1, 2, 3]; // Add 3 items to the cart
    let itemNames: string[] = [];

    await test.step('Add multiple products to cart', async () => {
      itemNames = await productSteps.addProductsToCart(itemIndexes);
    });

    await test.step('Navigate to cart', async () => {
      await productSteps.navigateToCart();
    });

    await test.step('Verify cart badge shows correct count', async () => {
      await productSteps.verifyCartBadgeCount(itemIndexes.length);
    });

    await test.step('Verify cart contains all added items', async () => {
      await cartSteps.verifyCartItemCount(itemIndexes.length);
    });
  });

  test(`@C10 Verify that user can back to Products by clicking the "Continue Shopping" button`, {
    tag: ['@C10', '@Cart']
  }, async () => {
    await test.step('Navigate to cart', async () => {
      await productSteps.navigateToCart();
    });

    await test.step('Click "Continue Shopping" button', async () => {
      await cartSteps.clickContinueShoppingButton();
    });

    await test.step('Verify product page is displayed', async () => {
      await productSteps.verifyProductPageIsDisplayed();
    });
  });
});