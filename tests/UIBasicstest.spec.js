const {test, expect} = require('@playwright/test');


test.only('Browser Context Playwright Test', async ({browser}) =>
    {
        //playwright code
    
        // chrome - plugins/ cookies
        const context = await browser.newContext();
        // create a page in the browser
        const page = await context.newPage();
    
        // url for the page object
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
        // step 1, get the title of the page object
        console.log (await page.title());
        // step 2, css locate the username element on the page object, fill in a value
        await page.locator("#username").fill("rahulshetty");
        // step 3, css locate the password element on the page object, fill in a value
        await page.locator("[type='password']").fill("learning");
        // step 4, click sign in button
        await page.locator("#signInBtn").click();
        // step 5.1, wait until there is an element with style attribute paritally matching 'block', print the error message in console
        console.log(await page.locator("[style*='block']").textContent());
        // step 5.2, another way to verify the text
        await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    
    });

test('Page Playwright Test', async ({page}) =>
{
    //playwright code

    // url for the page
    await page.goto("https://google.com")
    // step 1
    console.log (await page.title());
    await expect(page).toHaveTitle("Google");
    // step 2

    // step 3

});