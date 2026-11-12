const{test, expect} = require("@playwright/test")

test('open browser 2' , async({browser}) =>{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto('https://www.google.com');
console.log(await page.title())
await expect(page).toHaveTitle("Google");


})

test('open browser 3', async({page}) => {

    await page.goto("https://www.jiofinance.in/")
    console.log(await page.title())

});



