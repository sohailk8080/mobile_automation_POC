import { expect } from '@wdio/globals'; // Imports the assertion library
import catalogPage from '../pageobjects/catalog.page.js'; // Imports our page object
describe('Shopping Cart Flow', () => { // Mocha: Defines a Test Suite    
    it('should add item and update cart badge', async () => { // Mocha: Defines an individual test case                

        // 1. Action: Tap the first product on the screen        
        await catalogPage.selectFirstProduct();                    
        //2. Click on add to cart button
        await catalogPage.addFirstProductToCart();
        // 3. Data Retrieval: Ask the page object what number is on the cart badge        
        const count = await catalogPage.getCartCount();
        // 4. Assertion: Verify the data matches our expectation        
        await expect(count).toEqual('2'); // If not '1', the test will fail and log an error    
    });
});
