Feature: Ecommerce validations

Scenario: Placing the order
    Given a login to Ecommerce application with "username" and "password"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and Place the order
    Then Verify order in present in the OrderHistory
