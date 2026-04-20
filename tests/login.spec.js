const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');

test.describe('Scenario 1: User Login Verification', () => {
  let loginPage;
  let productsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.goto();
  });

  test('Verify User Login with Valid Credentials', async ({ page }) => {
    console.log('1: Entering username and password.');
    
    // When: The user enters username and password
    await loginPage.login('standard_user', 'secret_sauce');
    
    console.log('2: Clicking login button.');
    
    // Then: User should be successfully logged in
    await expect(page).toHaveURL(/.*inventory.html/);
    console.log('✓ Redirected to inventory page');
    
    // And: User should navigate to the Product Page
    const isProductPageVisible = await productsPage.isProductPageVisible();
    expect(isProductPageVisible).toBeTruthy();
    
    const productTitle = await productsPage.getProductTitle();
    expect(productTitle).toBe('Products');
    
    console.log('✓ Product page is visible');
    console.log('TEST PASSED: User successfully logged in and navigated to Product Page');
  });
});