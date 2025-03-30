const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataforOrder :  {
            username : "mayuanmyra@gmail.com",
            password : "Test_123",
            productName : "ZARA COAT 3"
        }
    }
)