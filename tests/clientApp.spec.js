

const { test, expect } = require('@playwright/test')

test('Client App Login', async ({ page }) => {
    const productName = 'ZARA COAT 3';
    const products = page.locator('.card-body')
    const emailId = 'suyashpatil01@gmail.com'
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#userEmail').fill(emailId)
    await page.locator('#userPassword').fill('Suyash@001')
    await page.locator('#login').click()
    await page.waitForLoadState('networkidle');
    const titlecart = await page.locator('.card-body b').allTextContents();
    console.log(titlecart);

    const count = await products.count();
    console.log("Item Count in the screen => " + count);

    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() == productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink='/dashboard/cart']").click();
    await page.locator('div li').first().waitFor();
    const bool = await page.locator
        ('h3:has-text("ZARA COAT 3")').isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text='Checkout'").click();

    //   await page.locator("[placeholder='Select Country']").pressSequentially('Ind',{delay:100});
    //   const dropdown = page.locator(".ta-results")
    //   await dropdown.waitFor();
    //   const options =  page.locator("button")
    //   const optcount = await options.count();

    //   for(let i=0; i<optcount; i++){
    //     const text = await dropdown.locator("button").nth(i).textContent();
    //         if(text.includes('India'))
    //     {    
    //          await options.nth(i).click();

    //         break;
    //     }
    //   }


    await page.locator("[placeholder='Select Country']")
        .pressSequentially("Ind");

    await page.locator(".ta-results").waitFor();

    await page.locator(".ta-results button")
        .getByText("India", { exact: true })
        .click();


    expect(page.locator(".user__name [type='text']").first()).toHaveText(emailId);
    await page.locator(".btnn").click();
    await expect(page.locator(".hero-primary"))
        .toHaveText("Thankyou for the order.");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()

    console.log("Order id of the product is => " + orderId);
    await page.locator("label[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor()
    const rows = page.locator("tbody tr")


    for (let i = 0; i < await rows.count(); i++) {
        const rowsorderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowsorderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }

    }

    const orderIdDetails = await page.locator(".col-text").textContent()
    expect(orderId.includes(orderIdDetails)).toBeTruthy
})