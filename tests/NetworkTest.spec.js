const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');

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

const fakePayLoadOrders = {data:[], message:"No Orders"};

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

        // intercepting response - API response, hijack it, inject a fake playwright response, send it to website
        await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
          async route=>
          {
            const response = await page.request.fetch(route.request());// fetch the real response
            let body = JSON.stringify(fakePayLoadOrders);// fulfill the response wtih the fake payload data
            route.fulfill(
              {
                response,
                body,
              }
            );
            
          }
        );
        
        await page.locator("button[routerlink*='myorders']").click();
        await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
        console.log(await page.locator(".mt-4").textContent());
     
  
    });
    