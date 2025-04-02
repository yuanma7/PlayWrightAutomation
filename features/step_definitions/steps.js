const { When, Then } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager');
const { test, expect, playwright } = require('@playwright/test');


Given('a login to Ecommerce application with {string} and {string}', async function (string, string2) {
    // Write code here that turns the phrase above into concrete actions
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);

});

When('Add {string} to Cart', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the Cart', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();
});

When('Enter valid details and Place the order', async function () {
    // Write code here that turns the phrase above into concrete actions
    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
});

Then('Verify order in present in the OrderHistory', async function () {
    // Write code here that turns the phrase above into concrete actions
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});