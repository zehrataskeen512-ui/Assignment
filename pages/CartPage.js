class CartPage {
    constructor(page) {
      this.page = page;
      this.cartTitle = page.locator('.title');
      this.cartItems = page.locator('.cart_item');
      this.checkoutButton = page.locator('[data-test="checkout"]');
      this.itemName = page.locator('.inventory_item_name');
    }
  
    async isCartPageVisible() {
      return await this.cartTitle.isVisible();
    }
  
    async getCartTitle() {
      return await this.cartTitle.textContent();
    }
  
    async getCartItemCount() {
      return await this.cartItems.count();
    }
  
    async getFirstItemName() {
      return await this.itemName.first().textContent();
    }
  
    async proceedToCheckout() {
      await this.checkoutButton.click();
    }
  }
  
  module.exports = { CartPage };