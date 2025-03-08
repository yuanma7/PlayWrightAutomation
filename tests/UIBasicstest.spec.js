const {test, expect} = require('@playwright/test');


test.only('Browser Context Playwright Test', async ({browser}) =>
    {
        //playwright code
    
        // create an object to store a browser
        const context = await browser.newContext();
        // create an object to store a new page in the browser
        const page = await context.newPage();
        // url for the page object
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
        
        // create an object to store userName locator
        const userName = page.locator("#username");
        // create an object to store sign in button locator
        const signIn = page.locator("#signInBtn");
        // create an obhect to store card titles locator
        const cardTitles = page.locator(".card-body a")
        
        // step 1, get the title of the page object
        console.log (await page.title());
        // step 2, css locate the username element on the page object, fill in a value
        await userName.fill("rahulshetty");
        // step 3, css locate the password element on the page object, fill in a value
        await page.locator("[type='password']").fill("learning");
        // step 4, click sign in button
        await signIn.click();
        // step 5.1, wait until there is an element with style attribute paritally matching 'block', print the error message in console
        console.log(await page.locator("[style*='block']").textContent());
        // step 5.2, another way to verify the text
        await expect(page.locator("[style*='block']")).toContainText('Incorrect');
        // step 6, update userName value, sign in again
        await userName.fill("rahulshettyacademy");
        await signIn.click();
        // step 7, grab the name of the first product
        console.log(await page.locator(".card-body a").nth(0).textContent());
        // step 8, grab all the card titles
        // BUT allTextContents doesn't wait for content to be attached/loaded, it could return 0 element/value, the test still passes
        // const allTitles = await cardTitles.allTextContents();
        console.log(allTitles);
    
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