import { expect } from '@wdio/globals';
import catalogPage from '../pageobjects/catalog.page.js';

describe('Checkout flow', () => {

    it('it should checkout with items added to the cart', async () => {
        // 1. Action: Tap the first product on the screen        
        await catalogPage.selectFirstProduct();
        //2. Click on add to cart button
        await catalogPage.addFirstProductToCart();
        //3. Assert checkout button is visible after going to cart
        await catalogPage.openCart();

        expect(await catalogPage.checkVisibilityOfCheckoutBtn()).toEqual("Proceed To Checkout");
        //4. Click on Checkout btn and see it takes you to the login page
        await catalogPage.clickCheckoutButton();
        expect(await catalogPage.verifyLoginPageAfterCheckout()).toContain('Login');
    });
 
});