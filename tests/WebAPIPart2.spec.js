const {test, expect} = require('@playwright/test');

let webContext;

test.beforeAll( async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");    
    await page.locator("#userEmail").fill("mayuanmyra@gmail.com");
    await page.locator("#userPassword").fill("Test_123");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');

    await context.storageState({path: 'state.json'});
    
    webContext = await browser.newContext({storageState: 'state.json'});

}
);

test('Client App Login', async ({})=>
    {
        const productName = 'ZARA COAT 3';
        const page = await webContext.newPage(); // login details will be created in test before all method, and used when creating new page

        await page.goto("https://rahulshettyacademy.com/client"); // login page or step will be bypassed

        const products = page.locator(".card-body");
        const titles = await page.locator(".card-body b").allTextContents();
        console.log(titles);
    
        const count = await products.count();
        for(let i = 0; i< count; ++i)
        {
            if(await products.nth(i).locator("b").textContent() === productName)
            {
                // add to card
                await products.nth(i).locator("text=Add To Cart").click();
                break;
            }
        }
    
        await page.locator("[routerlink*='cart']").click();
        await page.locator("div li").first().waitFor();
        const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
        expect(bool).toBeTruthy();
            
        await page.locator("text=Checkout").click();
        await page.locator("[placeholder*='Country']").pressSequentially('ind');
    
        const dropdown = page.locator(".ta-results");
        await dropdown.waitFor();
    
        const optionsCount = await dropdown.locator("button").count();
        for (let i = 0; i< optionsCount; ++i)
        {
            const text = await dropdown.locator("button").nth(i).textContent();
            if(text.trim() === "India")
            {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }
        
        await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
        await page.locator(".action__submit").click();
    
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    
        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        await console.log(orderId);
    
        //Verify the order ID is displayed in user's orders
        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        const rows = await page.locator("tbody tr");
     
        for (let i = 0; i < await rows.count(); ++i) 
        {
           const rowOrderId = await rows.nth(i).locator("th").textContent();
           if (orderId.includes(rowOrderId)) 
            {
              await rows.nth(i).locator("button").first().click();
              break;
            }
        }
        const orderIdDetails = await page.locator(".col-text").textContent();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();
    
    });

    test('@API Test case 2', async ({})=>
        {
            const productName = 'ZARA COAT 3';
            const page = await webContext.newPage(); // login details will be created in test before all method, and used when creating new page
    
            await page.goto("https://rahulshettyacademy.com/client"); // login page or step will be bypassed
    
            const products = page.locator(".card-body");
            const titles = await page.locator(".card-body b").allTextContents();
            console.log(titles);
        }
    );