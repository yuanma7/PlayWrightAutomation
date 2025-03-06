const {test, expect} = require('@playwright/test');


test('Browser Context Playwright Test', async ({browser}) =>
    {
        //playwright code
    
        // chrome - plugins/ cookies
        const context = await browser.newContext();
        // create a page in the browser
        const page = await context.newPage();
    
        // url for the page
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
        // step 1
        console.log (await page.title());
        // step 2
    
        // step 3
    
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