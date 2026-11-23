
    import{expect, test}  from '@playwright/test';

    test('Playwright spll loctor testing' , async({page})=>{
        await page.goto("https://rahulshettyacademy.com/angularpractice/");
        await page.locator("input[name='name']").first().fill("Suyash");
        await page.locator("input[name='email']").fill("Suyash@001");
        await page.getByPlaceholder("Password").fill("Suyash@001");
        await page.getByLabel("Check me out if you Love IceCreams!").click();
        await page.getByLabel("Employed").click();
        await page.getByLabel("Gender").selectOption("Male");
        await page.getByRole("button", {name: 'Submit'}).click();
        await page.getByText("Success! The Form has been submitted successfully!").isVisible();


    await expect(page.getByText("Success! The Form has been submitted successfully!").isVisible({timeout:10_000}));

        await page.getByRole("link",{name:'Shop'}).click();
    await expect(page.locator(".my-4").first()).toHaveText("Shop Name");
        const shopname = await (page.locator(".my-4").first()).textContent();
        console.log.apply(shopname);
        await page.locator("app-card").filter({hasText:'Samsung Note 8'}).getByRole("button").click();
    })