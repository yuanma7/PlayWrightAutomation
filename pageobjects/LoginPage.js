class LoginPage {

    constructor(page) {
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.passWord = page.locator("#userPassword");
        this.signInbutton = page.locator("#login");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username, password) {
        await this.userName.fill(username);
        await this.passWord.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage }