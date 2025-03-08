// https://rahulshettyacademy.com/client
// open, register, login, grab the name of the first product

const {test, expect} = require('@playwright/test');


test('Browser Context Playwright Test1', async ({browser}) =>
    {
        //playwright code
    
        // create an object to store a browser
        const context = await browser.newContext();
        // create an object to store a new page in the browser
        const page = await context.newPage();
        // url for the page object
        await page.goto("https://rahulshettyacademy.com/client");

        
    }
);