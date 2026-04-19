class ProductsPage {
  constructor(page) {
    this.page = page;
    this.productTitle = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartButton = page.locator('.shopping_cart_link');
  }

  async isProductPageVisible() {
    return await this.productTitle.isVisible();
  }

  async getProductTitle() {
    return await this.productTitle.textContent();
  }

  async addProductToCart(productName) {
    // Convert product name to the data-test attribute format
    const productId = productName.toLowerCase().replace(/\s/g, '-');
    const productSelector = `[data-test="add-to-cart-${productId}"]`;
    await this.page.locator(productSelector).click();
  }

  async addBackpackToCart() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  async getCartItemCount() {
    if (await this.cartBadge.isVisible()) {
      const count = await this.cartBadge.textContent();
      return parseInt(count);
    }
    return 0;
  }

  async goToCart() {
    await this.cartButton.click();
  }
}

module.exports = { ProductsPage };