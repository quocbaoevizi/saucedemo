import { test } from '@playwright/test';
import { AuthSteps } from '../steps/auth-steps';
import LoginPage from '../pages/LoginPage';
import { ProductSteps } from '../steps/product-steps';
import { CartSteps } from '../steps/cart-steps';

test.describe('Product Page Tests', () => {
  let authSteps: AuthSteps;
  let loginPage: LoginPage;
  let productSteps: ProductSteps;
  let cartSteps: CartSteps;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    authSteps = new AuthSteps(page, loginPage);
    productSteps = new ProductSteps(page);
    cartSteps = new CartSteps(page);
    await authSteps.loginWithValidCredentials();
    await productSteps.verifyProductPageIsDisplayed();
  });

  // test('@C04 Verify that the user can add multiple products to cart', async () => {
  //   let itemIndexes: number[] = [1, 2];
  //   let itemNames: string[] = [];
  //   await test.step('Add products to cart', async () => {
  //     itemNames = await productSteps.addProductsToCart(itemIndexes);
  //   });

  //   await test.step('Verify cart badge shows correct count', async () => {
  //     await productSteps.verifyCartBadgeCount(itemIndexes.length);
  //   });

  //   await test.step('Navigate to cart', async () => {
  //     await productSteps.navigateToCart();
  //   });

  //   await test.step('Verify cart contents', async () => {
  //     await cartSteps.verifyCartItemCount(itemIndexes.length);
  //     await cartSteps.verifyCartContainsItems(itemNames);
  //   });
  // });

  test('@C05 Verify that the user can remove a product from cart', async () => {
    let itemIndexes: number[] = [1, 2];
    let itemNames: string[] = [];
    let itemNameRemoved: string | null = null;
    await test.step('Add product to cart', async () => {
      itemNames = await productSteps.addProductsToCart(itemIndexes);
    });

    await test.step('Navigate to cart', async () => {
      await productSteps.navigateToCart();
    });

    await test.step('Verify cart contents', async () => {
      await cartSteps.verifyCartItemCount(itemIndexes.length);
      await cartSteps.verifyCartContainsItems(itemNames);
    });

    await test.step('Remove product from cart', async () => {
      itemNameRemoved = await cartSteps.removeProductFromCart(0);
    });

    await test.step('Verify that the user can remove a product from the cart successfully', async () => {
      await cartSteps.verifyCartItemCount(itemIndexes.length - 1);
    });

    await test.step('Navigate back to product page', async () => {
      await cartSteps.goBackToProductPage();
    });

    await test.step('Verify the Remove button changes to Add to cart', async () => {
      if (itemNameRemoved) {
        await productSteps.verifyProductItemReadyToAddToCart(itemNameRemoved);
      }
      else {
        throw new Error('Item name removed is null');
      }
    })
  });
});