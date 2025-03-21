class APIUtils
{
    constructor(apiContext, loginPayLoad)
    {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: this.loginPayLoad});
        const loginResponseJson = await loginResponse.json();
        const token = await loginResponseJson.token;
        await console.log(token);
        return token;
    }

    async createOrder(orderPayLoad)
    {
        let response = {};
        response.token = await this.getToken();

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
            {
                data: orderPayLoad,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                },
            });
        
        const orderResponseJson = await orderResponse.json();
        const orderId = await orderResponseJson.orders[0];
        await console.log(orderId);
        response.orderId = orderId;

        return response;
    }
}

module.exports = {APIUtils};