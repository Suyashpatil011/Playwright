const { test, expect } = require('@playwright/test');

test('Client App Login', async ({ page }) => {

    // Test Data
    const productName = 'ZARA COAT 3';
    const emailId = 'suyashpatil01@gmail.com';
    const pass = 'Suyash@001';

    // Navigate to application
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    // Login to application
    await page.getByPlaceholder('email@example.com').fill(emailId);
    await page.getByPlaceholder('enter your passsword').fill(pass);
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait until all API calls are completed
    await page.waitForLoadState('networkidle');

    // Print all available product names
    const titlecart = await page.locator('.card-body b').allTextContents();
    console.log(titlecart);

    // Add the required product to cart
    await page.locator('.card-body')
        .filter({ hasText: productName })
        .getByRole('button', { name: 'Add To Cart' })
        .click();

    // Navigate to Cart page
    await page.getByRole('listitem')
        .getByRole('button', { name: 'cart' })
        .click();

    // Wait for cart items to load
    await page.locator('div li').first().waitFor();

    // Verify selected product is present in cart
    await expect(page.getByText(productName)).toBeVisible();

    // Proceed to checkout
    await page.getByRole('button', { name: 'checkout' }).click();

    // ====================================================
    // Dynamic Country Selection (Recommended Approach)
    // ====================================================

    /*
    await page.locator("[placeholder='Select Country']")
        .pressSequentially("Ind");

    await page.locator(".ta-results").waitFor();

    await page.locator(".ta-results button")
        .getByText("India", { exact: true })
        .click();
    */

    // ====================================================
    // Static Approach (Not Recommended)
    // Depends on dropdown position and may fail if order changes
    // ====================================================

    await page.getByPlaceholder('Select Country')
        .pressSequentially('Ind');

    await page.getByRole('button', { name: 'India' }).nth(1)
        .click();

    // Verify logged-in email on checkout page
    await expect(
        page.locator(".user__name [type='text']").first()
    ).toHaveText(emailId);

    // Place the order
    await page.getByText('PLACE ORDER').click();

    // Verify successful order placement
    await expect(
        page.getByText('Thankyou for the order.')
    ).toBeVisible();

    // Capture Order ID
    const orderId = await page.locator(
        '.em-spacer-1 .ng-star-inserted'
    ).textContent();

    console.log('Order ID => ' + orderId);

    // Navigate to Orders page
    await page.locator("label[routerlink*='myorders']").click();

    // Wait for orders table to load
    await page.locator('tbody').waitFor();

    const rows = page.locator('tbody tr');

    // Search for the created order in Orders history
    for (let i = 0; i < await rows.count(); i++) {

        const rowsorderId = await rows
            .nth(i)
            .locator('th')
            .textContent();

        if (orderId.includes(rowsorderId)) {

            // Open order details
            await rows.nth(i)
                .locator('button')
                .first()
                .click();

            break;
        }
    }

    // Fetch Order ID from Order Details page
    const orderIdDetails = await page
        .locator('.col-text')
        .textContent();

    // Verify both Order IDs match
    expect(orderId.includes(orderIdDetails))
        .toBeTruthy();
});