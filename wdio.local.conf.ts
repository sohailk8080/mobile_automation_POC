import path from 'path';  //designed to work with file system paths and directory structures

export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,
    specs: ['./test/specs/**/*.ts'], // Picks up all spec files in parallel
    maxInstances: 1, // Setting this to 2 allows 2 parallel worker processes
    capabilities: [
        {
            // Device 1 Configuration
            maxInstances: 1,   //this will be removed when working with 2 diffent emulators
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:deviceName': 'Pixel_8_API_34', // First Emulator AVD Name
            'appium:udid': 'emulator-5554',         // First Emulator Port ID
            'appium:app': path.resolve('./apps/Demo_App.apk'),
            //'appium:systemPort': 8200,             // Unique driver port for Device 1
            'appium:autoGrantPermissions': true,
            //'appium:autoAcceptAlerts': true
        }//,
        /*{
            // Device 2 Configuration
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:deviceName': 'Pixel_8_API_34', // Second Emulator AVD Name
            'appium:udid': 'emulator-5556',         // Second Emulator Port ID
            'appium:app': path.resolve('./apps/Demo_App.apk'),
            'appium:systemPort': 8201,             // Unique driver port for Device 2
            'appium:autoGrantPermissions': true,
            //'appium:autoAcceptAlerts': true
        }*/
    ],
    logLevel: 'info',
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    services: [
        ['appium', {
            args: {
                relaxedSecurity: true
            }
        }]
    ],

    /**
     * WebdriverIO Lifecycle Hook
     * Runs automatically before every single test case across all workers
     */
    beforeTest: async function (test, context) {
        try {
            // Locate "Don't Show Again" or "OK" button from the OS alert
            const dontShowAgainBtn = await $('//android.widget.Button[@text="Don\'t Show Again"]');

            // Check if dialog is visible on screen
            if (await dontShowAgainBtn.waitForDisplayed({ timeout: 2000 })) {
                await dontShowAgainBtn.click();
            }
        } catch (e) {
            // Dialog did not appear, continue test execution normally
        }
    },

    // Automatically capture a screenshot on test failure
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            try {
                // Safely capture screenshot if session is still alive
                await driver.takeScreenshot();
            } catch (e: unknown) {
                // Check type before accessing .message
                if (e instanceof Error) {
                    console.warn('Could not take screenshot:', e.message);
                } else {
                    console.warn('Could not take screenshot:', String(e));
                }
            }
        }
    }
};