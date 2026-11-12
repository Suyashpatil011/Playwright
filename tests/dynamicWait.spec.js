const{test} = require("@playwright/test")

test("Registration the New User ", async ({page}) => {

    const userName = page.getByPlaceholder("email@example.com");
    const passWord = page.getByRole('textbox',{name:'enter your passsword'});
    const signBtn = page.getByText('Login');
    const cartItem = page.locator(".card-body b")

    await page.goto("https://rahulshettyacademy.com/client/auth/login")
    await userName.fill("suyashpatil01@gmail.com")
    await passWord.fill('Suyash@001');
    await signBtn.click();
    await page.waitForLoadState('networkidle')
    console.log(await cartItem.allTextContents())
});


