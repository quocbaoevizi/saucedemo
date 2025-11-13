import { CartSteps } from "../steps/cart-steps";
import { ProductSteps } from "../steps/product-steps";
import { CheckoutSteps } from "../steps/checkout-steps";
import { AuthSteps } from "../steps/auth-steps";
import LoginPage from "../pages/LoginPage";
import { test, Page } from "@playwright/test";

test.describe('Checkout Page Tests', () => {
  let authSteps: AuthSteps;
  let loginPage: LoginPage;
  let productSteps: ProductSteps;
  let cartSteps: CartSteps;
  let checkoutSteps: CheckoutSteps;
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    loginPage = new LoginPage(page);
    authSteps = new AuthSteps(page, loginPage);
    productSteps = new ProductSteps(page);
    cartSteps = new CartSteps(page);
    checkoutSteps = new CheckoutSteps(page);
    await authSteps.loginWithValidCredentials();
    await productSteps.verifyProductPageIsDisplayed();
  });

  test('@C11 Verify that the user can successfully proceed to checkout from the cart', {
    tag: ['@C11', '@Checkout']
  }, async () => {
    const itemIndexes = [1]; // Add an item to the cart
    let itemNames: string[] = [];

    await test.step('Add an item to cart', async () => {
      itemNames = await productSteps.addProductsToCart(itemIndexes);
    });

    await test.step('Verify cart badge shows correct count', async () => {
      await productSteps.verifyCartBadgeCount(itemIndexes.length);
    });

    await test.step('Navigate to cart', async () => {
      await productSteps.navigateToCart();
    });

    await test.step('Click checkout button', async () => {
      await cartSteps.clickCheckoutButton();
    });

    await test.step('Verify checkout page is displayed', async () => {
      await checkoutSteps.verifyPageIsDisplayed();
    });
  });
})