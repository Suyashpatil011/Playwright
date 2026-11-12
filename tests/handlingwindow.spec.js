const{test} = require("@playwright/test")

test('@child window handl' , async({browser})=>{

const context = await browser.newContext();
const page = await context.newPage();
const userName = page.locator('#username');
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
const documentLink = page.locator("[href*='documents-request']")

///navaigte to  child window
const [newpage] = await Promise.all([
    (context.waitForEvent('page')),
    documentLink.click()

])

const text = await newpage.locator(".red").textContent();
//extract the text
const arrayText = text.split("@")
const domain = arrayText[1].split(" ")[0]
console.log("Domain username is => " + domain)

//navigate parent window and entered the to input box
await userName.fill(domain);
console.log( "Entered value of user name is => " + await userName.inputValue())
})