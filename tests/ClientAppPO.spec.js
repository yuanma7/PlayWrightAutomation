// https://rahulshettyacademy.com/client
// open, register, login, grab the name of the first product

const {test, expect } = require('@playwright/test');
const {customtest} = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');
//json -> string -> javascript object to avoid json encoding issues
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

for (const data of dataSet) {

    test(`Client App Login ${data.productName}`, async ({ page }) => {
        const poManager = new POManager(page);

        const products = page.locator(".card-body");
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
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

    customtest.only(`Client App Login 2 ${data.productName}`, async ({ page, testDataforOrder }) => {
        const poManager = new POManager(page);

        const products = page.locator(".card-body");
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(testDataforOrder.username, testDataforOrder.password);
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(testDataforOrder.productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(testDataforOrder.productName);
        await cartPage.Checkout();

    });

}
