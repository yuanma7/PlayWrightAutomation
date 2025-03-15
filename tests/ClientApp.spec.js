// https://rahulshettyacademy.com/client
// open, register, login, grab the name of the first product

const {test, expect} = require('@playwright/test');


test.skip('Register', async ({browser}) =>
    {
        //playwright code
    
        // create an object to store a browser
        const context = await browser.newContext();
        // create an object to store a new page in the browser
        const page = await context.newPage();
        // url for the page object
        await page.goto("https://rahulshettyacademy.com/client");
        console.log (await page.url());

        const registerBtn = page.locator("[class='login-wrapper-footer-text']");
        await registerBtn.click();

        console.log (await page.url());
        const firstName = page.locator("#firstName");
        const lastName = page.locator("#lastName");
        const Email = page.locator("#userEmail");
        const userMobile = page.locator("#userMobile");
        const password = page.locator("#userPassword");
        const confirmPassword = page.locator("#confirmPassword");
        const over18 = page.locator("[type='checkbox']");
        const RegisterBtn = page.locator("#login");

        await firstName.fill("yuan");
        await lastName.fill("Maa");
        await Email.fill("mayuanmyra@gmail.com");
        await userMobile.fill("4313108851");
        await password.fill("Test_123");
        await confirmPassword.fill("Test_123");
        await over18.check();
        await RegisterBtn.click();

        console.log(await page.locator(".overlay-container").textContent());
        console.log(await page.url());

    }
);

test.skip('Login', async ({browser}) =>
    {
        //playwright code
    
        // create an object to store a browser
        const context = await browser.newContext();
        // create an object to store a new page in the browser
        const page = await context.newPage();
        // url for the page object
        await page.goto("https://rahulshettyacademy.com/client");
        console.log (await page.url());

        const Email = page.locator("#userEmail");
        const password = page.locator("#userPassword");
        const loginBtn = page.locator("#login");
        
        await Email.fill("mayuanmyra@gmail.com");
        await password.fill("Test_123");
        await loginBtn.click();
        
        // wait for all network calls are completed, not always work
        //await page.waitForLoadState('networkidle');

        console.log(await page.locator(".card-body b").nth(0).textContent());
        console.log (await page.url());

        // waitFor() works when there is single ONE element
        await page.locator(".card-body b").nth(0).waitFor();

        const titles = await page.locator(".card-body b").allTextContents();
        console.log(titles);
    }
);

test('Client App Login', async ({page})=>
{
    const products = page.locator(".card-body b");
    await page.goto("https://rahulshettyacademy.com/client");
    const Email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("#login");
        
    await Email.fill("mayuanmyra@gmail.com");
    await password.fill("Test_123");
    await loginBtn.click();
    await page.waitForLoadState('networkidle');

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);   

}

);