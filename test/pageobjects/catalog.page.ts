import Page from './page.js'; // Imports our base Page class
class CatalogPage extends Page { // Inherits all methods (like clickElement) from the base Page        
    // Private locators: Encapsulation. Tests shouldn't know HOW to find the cart, they just ask the page to do it.    
     
    private get firstProductItem() {
        return '//android.widget.TextView[@text="Sauce Labs Backpack"]';
    }

    private get addToCart() {
        return '//android.widget.TextView[@text="Add To Cart"]';
    }

    private get cartBadge() {
        return '~cart badge';
    }

    private get countOnCartBadge() {
        return '//android.view.ViewGroup[@content-desc="cart badge"]/android.widget.TextView';
    }

    private get checkout() {
        return '//android.widget.TextView[@text="Proceed To Checkout"]';
    }

    private get loginTextAfterCheckout() {
        return '//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView';
    }

    private get usernameInput() {
        return '~Username input field'; // e.g. '~Username input field' or '#username'
    }

    private get passwordInput() {
        return '~Password input field'; // e.g. '~Password input field' or '#password'
    }

    private get loginButton() {
        return '~Login button'; // e.g. '~Login button' or '//android.widget.Button'
    }

    private get errorMessage() {
        return '//android.widget.TextView[@text="Provided credentials do not match any user in this service."]'; // e.g. '//android.view.ViewGroup[@content-desc="generic-error-message"]/android.widget.TextView'
    }

    private get paymentBtn() {
        return '~To Payment button';
    }

    // Public method that the test script will call    
    public async selectFirstProduct(): Promise<void> {
        await this.clickElement(this.firstProductItem); // Uses base class to wait and click    
    }
    public async addFirstProductToCart(): Promise<void> {
        await this.clickElement(this.addToCart); //Uses base class to wait and click
    }
    public async getCartCount(): Promise<string> {
        return await this.getElementText(this.countOnCartBadge); // Uses base class to get text    
    }
    public async checkVisibilityOfCheckoutBtn(): Promise<String> {
        return await this.getElementText(this.checkout);
    }
    public async openCart(): Promise<void> {
        return await this.clickElement(this.cartBadge);
    }
    public async clickCheckoutButton(): Promise<void> {
        return await this.clickElement(this.checkout);
    }
    public async verifyLoginPageAfterCheckout(): Promise<string> {
        return await this.getElementText(this.loginTextAfterCheckout); // Uses base class to get text    
    }

    public async checkVisibilityOfPaymentBtn(): Promise<Boolean> {
        return await this.elementDisplayed(this.paymentBtn);
    }

    // Public Actions for Login
    public async enterUsername(username: string): Promise<void> {
        await this.inputValues(this.usernameInput, username);
    }

    public async enterPassword(password: string): Promise<void> {
        await this.inputValues(this.passwordInput, password);
    }

    public async clickLoginButton(): Promise<void> {
        await this.clickElement(this.loginButton);
    }

    public async getErrorMessageText(): Promise<string> {
        return await this.getElementText(this.errorMessage);
    }

    // Business flow: Perform complete login
    public async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

}
export default new CatalogPage(); // Exports a single instance of this page (Singleton pattern)
