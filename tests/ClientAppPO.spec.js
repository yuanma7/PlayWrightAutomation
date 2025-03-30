// https://rahulshettyacademy.com/client
// open, register, login, grab the name of the first product

const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
//json -> string -> javascript object to avoid json encoding issues
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

test('Client App Login', async ({ page }) => {
    const poManager = new POManager(page);

    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(dataSet.username, dataSet.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(dataSet.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(dataSet.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();


});


