class CheckoutPage {
    constructor(page) {
      this.page = page;
      this.firstNameInput = page.locator('[data-test="firstName"]');
      this.lastNameInput = page.locator('[data-test="lastName"]');
      this.postalCodeInput = page.locator('[data-test="postalCode"]');
      this.continueButton = page.locator('[data-test="continue"]');
      this.finishButton = page.locator('[data-test="finish"]');
      this.confirmationMessage = page.locator('.complete-header');
      this.totalAmount = page.locator('.summary_total_label');
    }
  
    async fillCheckoutInformation(firstName, lastName, postalCode) {
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.fill(lastName);
      await this.postalCodeInput.fill(postalCode);
    }
  
    async continueCheckout() {
      await this.continueButton.click();
    }
  
    async finishOrder() {
      await this.finishButton.click();
    }
  
    async getConfirmationMessage() {
      return await this.confirmationMessage.textContent();
    }
  
    async getTotalAmount() {
      return await this.totalAmount.textContent();
    }
  }
  
  module.exports = { CheckoutPage };