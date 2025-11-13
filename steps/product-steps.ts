import { Page } from "@playwright/test";
import ProductPage from "../pages/ProductPage";
import LoginPage from "../pages/LoginPage";

export class ProductSteps {
  private productPage: ProductPage;

  constructor(
    private page: Page,
  ) {
    this.productPage = new ProductPage(page);
  }
}
