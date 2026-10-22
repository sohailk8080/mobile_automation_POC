import { $ } from '@wdio/globals'; // Imports the global '$' element selector from WebdriverIO
export default class Page { // Creates a blueprint class that other pages will inherit from        
    // 'protected' means this method can only be used by this class or classes that extend it    
    protected async clickElement(selector: string): Promise<void> {
        const element = await $(selector); // Finds the element on the mobile screen        
        await element.waitForDisplayed({ timeout: 10000 }); // Waits up to 10 seconds for it to appear        
        await element.click(); // Simulates a physical tap on the element    
    }
    
    protected async getElementText(selector: string): Promise<string> {
        const element = await $(selector); // Finds the element        
        await element.waitForDisplayed({ timeout: 10000 }); // Waits for visibility        
        return await element.getText(); // Extracts and returns the visible text string    
    }

    // Added: Reusable method to type into text input fields
    protected async inputValues(selector: string, value: string): Promise<void> {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 10000 });
        await element.setValue(value);
    }

    protected async elementDisplayed(selector: string): Promise<boolean> {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 10000 });
        return await element.isDisplayed();
    }

}
