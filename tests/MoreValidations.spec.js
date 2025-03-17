const {test,expect} = require('@playwright/test')

test("Popup Validations", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://google.com");
    //await page.goBack();// back to the first link
    //await page.goForward();//forward to the second link

    await expect(page.locator("#displayed-text")).toBeVisible();

    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    page.on('dialog',dialog => dialog.accept());// accept whenever the dialog pop-up is displayed
    await page.locator("#confirmbtn").click();
    
    await page.locator("#mousehover").hover(); //hover on top of #mousehover element

    const framesPage = page.frameLocator("#courses-iframe"); // access the frame within the web page

    await framesPage.locator("li a[href*='lifetime-access']:visible").click(); // only click on the VISIBLE element

    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);// split the sentence by space, the results is an array, select the number part


})