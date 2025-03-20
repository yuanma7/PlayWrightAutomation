const {test, expect, request} = require('@playwright/test');
const loginPayLoad = {userEmail: "mayuanmyra@gmail.com", userPassword: "Test_123"};
const orderPayLoad = {
    orders: [
      {
        country: "British Indian Ocean Territory",
        productOrderedId: "67a8df56c0d3e6622a297ccd"
      },
    ]
  }
let token;
let orderId;

test.beforeAll( async()=>
{
    // login API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: loginPayLoad});
    await expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = await loginResponseJson.token;

    // place an order and get the orderId 
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
    {
        data: orderPayLoad,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    });

    const orderResponseJson = await orderResponse.json();
    orderId = await orderResponseJson.orders[0];
    await console.log(orderId);
    

});

test.beforeEach( ()=>
{
    
});

test('Client App Login', async ({page})=>
    {
        // lauch the window using the token created at test.beforeAll 
        // a function take the second argument, pass it to the first function, set it as Local Storage value
        page.addInitScript(value => {
            window.localStorage.setItem('token', value);
        }, token);

        await page.goto("https://rahulshettyacademy.com/client");

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
    
    // Verify if order created is showing in history page
    // Preconditiion - create order