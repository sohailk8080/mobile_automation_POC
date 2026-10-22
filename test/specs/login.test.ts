import { expect } from '@wdio/globals';
import catalogPage from '../pageobjects/catalog.page.js';
import { ExcelUtil } from '../utils/excelUtil.js';

describe('Login flow', () => {
    const excel = new ExcelUtil('TestData.xlsx');
    const sheetName = 'Sheet1';
    let allRecords: Array<Record<string, string>> = [];

    // Load all data from Excel before running tests
    before(async () => {
        allRecords = await excel.getAllRecords(sheetName);
    });

    // Helper method to navigate cleanly to the Login Screen
    async function navigateToLoginScreen() {
        await catalogPage.selectFirstProduct();
        await catalogPage.addFirstProductToCart();
        await catalogPage.openCart();
        await catalogPage.clickCheckoutButton();
    }

    // Safely ensures we are on the Login screen regardless of previous state
    async function ensureOnLoginScreen() {
        try {
            const header = await catalogPage.verifyLoginPageAfterCheckout();
            if (!header.includes('Login')) {
                await navigateToLoginScreen();
            }
        } catch (e) {
            // Header not found (we are on catalog/cart screen), navigate to login
            await navigateToLoginScreen();
        }
    }

    // 1. NEGATIVE TESTS: Iterates over all invalid login rows
    // -------------------------------------------------------------
    it('should verify error messages for all invalid login credentials', async () => {
        const invalidCases = allRecords.filter(row =>
            row.TestCaseID && row.TestCaseID.trim().toUpperCase().startsWith('TC_INVALID_LOGIN')
        );

        for (let i = 0; i < invalidCases.length; i++) {
            const data = invalidCases[i];
            const username = data.Username;
            const password = data.Password;
            const expectedError = data.ExpectedError;

            // Ensure we navigate to login screen on the first iteration
            if (i === 0) {
                await ensureOnLoginScreen();
            }

            // Enter credentials & submit
            await catalogPage.login(username, password);

            // Assert error message
            const actualError = await catalogPage.getErrorMessageText();
            expect(actualError).toContain(expectedError);
        }
    });

    // 2. POSITIVE TEST: Executes valid login and verifies payment button
    // -------------------------------------------------------------
    it('should navigate to payment screen on valid login', async () => {
        const validData = allRecords.find(row =>
            row.TestCaseID && row.TestCaseID.trim().toUpperCase() === 'TC_VALID_LOGIN'
        );
        if (!validData) {
            throw new Error('TC_VALID_LOGIN record not found in Excel!');
        }

        const username = validData.Username;
        const password = validData.Password;

        // if NOT already on the login screen
        await ensureOnLoginScreen();

        // Enter valid credentials & Submit
        await catalogPage.login(username, password);

        // Assert Payment button is displayed
        const isPaymentBtnVisible = await catalogPage.checkVisibilityOfPaymentBtn();
        expect(isPaymentBtnVisible).toBe(true);
    });
});