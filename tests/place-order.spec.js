const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('Scenario 2: Place Order and Checkout', () => {
  let loginPage;
  let productsPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    
    // Given: User is logged in
    console.log('Pre-condition: Logging in user...');
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);
    console.log('✓ User logged in successfully');
  });

  test('User Places an Order and Checks Out Successfully', async ({ page }) => {
    // When: User selects a product by clicking "Add to Cart"
    console.log('\nStep 1: Adding product to cart...');
    await productsPage.addBackpackToCart();
    
    // Verify cart badge shows 1 item
    const cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe(1);
    console.log('✓ Product added to cart (Cart count: ' + cartCount + ')');
    
    // And: Clicks on "Cart" button
    console.log('Step 2: Navigating to cart...');
    await productsPage.goToCart();
    
    // And: Navigates to "Your Cart" page
    const isCartVisible = await cartPage.isCartPageVisible();
    expect(isCartVisible).toBeTruthy();
    expect(await cartPage.getCartTitle()).toBe('Your Cart');
    console.log('✓ Navigated to Your Cart page');
    
    // And: Confirms selected product is added
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBeGreaterThan(0);
    
    const itemName = await cartPage.getFirstItemName();
    expect(itemName).toContain('Sauce Labs Backpack');
    console.log('✓ Verified product in cart: ' + itemName);
    
    // And: Clicks "Checkout" button
    console.log('Step 3: Proceeding to checkout...');
    await cartPage.proceedToCheckout();
    
    // And: Fills out checkout information
    console.log('Step 4: Filling checkout information...');
    await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
    
    // And: Clicks "Continue" button
    console.log('Step 5: Continuing to order overview...');
    await checkoutPage.continueCheckout();
    
    // And: Clicks "Finish" button after confirming order details
    const totalAmount = await checkoutPage.getTotalAmount();
    expect(totalAmount).toContain('Total');
    console.log('✓ Order total: ' + totalAmount);
    
    console.log('Step 6: Finishing order...');
    await checkoutPage.finishOrder();
    
    // Then: Order placed successfully with confirmation message
    const confirmationMessage = await checkoutPage.getConfirmationMessage();
    expect(confirmationMessage).toBe('Thank you for your order!');
    
    console.log('✓ Confirmation message: ' + confirmationMessage);
    console.log('✅ TEST PASSED: Order placed successfully!');
  });
});