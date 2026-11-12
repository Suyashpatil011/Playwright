const{test, expect} = require("@playwright/test")

    
test('open browser', async ({page}) => {

    const userName = page.locator('#username');
    const passWord = page.locator('#password');
    const checkBox = page.locator('#terms');
    const signBtn = page.locator('#signInBtn');
    const cartTitle = page.locator(".card-body a")
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title())
    await userName.fill("Suyash");
    await passWord.fill("suyash@001");
    await checkBox.click()
    await signBtn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('correct');

    await userName.fill("");
    await userName.fill("rahulshettyacademy")
    await passWord.fill("");
    await passWord.fill("Learning@830$3mK2");
    await checkBox.click()
    await signBtn.click();
    console.log("First Mobile is: " + await cartTitle.first().textContent());
    console.log("mobile count is :" + await cartTitle.count());
    console.log("All mobile is :" + await cartTitle.allTextContents());
});

test.only("UI Element" , async({page})=>{
   
    const userName = page.locator('#username');
    const passWord = page.locator('#password');
    const checkBox = page.locator('#terms');
    const signBtn = page.locator('#signInBtn');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title())
    await userName.fill("Suyash");
    await passWord.fill("suyash@001");
    const userRadio = page.locator("input[value='user']").last();
    await userRadio.click();
    await page.locator("#okayBtn").click();
    await expect(userRadio).toBeChecked();
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("Teacher")
    await page.locator(".radiotextsty").last().click();
    await checkBox.click();
    await expect(checkBox).toBeChecked();
          
    
})