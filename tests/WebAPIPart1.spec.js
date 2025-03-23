const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');

const loginPayLoad = {userEmail: "mayuanmyra@gmail.com", userPassword: "Test_123"};
const orderPayLoad = {
    orders: [
      {
        country: "British Indian Ocean Territory",
        productOrderedId: "67a8df56c0d3e6622a297ccd"
      },
    ]
  }
let response;

test.beforeAll( async()=>
{
    const apiContext = await request.newContext();
    // login
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    // create an order
    response = await apiUtils.createOrder(orderPayLoad);

});


test('Place the order', async ({page})=>
    {
        
        // a function take the second argument, pass it to the first function, set it as Local Storage value
        page.addInitScript(value => {
            window.localStorage.setItem('token', value);
        }, response.token);


        await page.goto("https://rahulshettyacademy.com/client/");
        //Verify the order ID is displayed in user's orders
        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        const rows = await page.locator("tbody tr");
     
        for (let i = 0; i < await rows.count(); ++i) 
        {
           const rowOrderId = await rows.nth(i).locator("th").textContent();
           if (response.orderId.includes(rowOrderId)) 
            {
              await rows.nth(i).locator("button").first().click();
              break;
            }
        }
        const orderIdDetails = await page.locator(".col-text").textContent();
        expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
    
    });
    