// https://rahulshettyacademy.com/client
// open, register, login, grab the name of the first product

const {test, expect} = require('@playwright/test');


test('Register', async ({browser}) =>
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

test('Login', async ({browser}) =>
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

// end to end testing, locators in css
test('Client App Login', async ({page})=>
{
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    const email = "mayuanmyra@gmail.com"
    await page.goto("https://rahulshettyacademy.com/client");
    const Email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("#login");
        
    await Email.fill(email);
    await password.fill("Test_123");
    await loginBtn.click();
    await page.waitForLoadState('networkidle');

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = await products.count();
    for(let i = 0; i< count; ++i)
    {
        if(await products.nth(i).locator("b").textContent() === productName)
        {
            // add to cart
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

// end to end testing, locators with GetBy
test('@Webst Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole('button',{name:"Login"}).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
    .getByRole("button",{name:"Add to Cart"}).click();
  
    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
  
    //await page.pause();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  
    await page.getByRole("button",{name :"Checkout"}).click();
  
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
  
    await page.getByRole("button",{name :"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
  
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
 });
