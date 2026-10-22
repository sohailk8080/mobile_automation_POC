import 'dotenv/config'; // Loads secrets from a .env file
import allureReporter from '@wdio/allure-reporter';
export const config: WebdriverIO.Config = {
    user: process.env.BROWSERSTACK_USERNAME, // Your BrowserStack email/username    
    key: process.env.BROWSERSTACK_ACCESS_KEY, // Your secret token    
    specs: ['./test/specs/**/*.ts'], // Tells WDIO where to find your test files    
    maxInstances: 1, // How many devices to run in parallel    
    capabilities: [{ // Defines the specific device and app we want BrowserStack to allocate        
        platformName: 'Android', // Target OS        
        'appium:automationName': 'UiAutomator2', // The driver to use        
        'appium:deviceName': 'Google Pixel 8', // The phone model        
        'appium:platformVersion': '14.0', // OS version        
        'appium:app': process.env.BROWSERSTACK_APP_ID, // The bs:// url of your uploaded APK        
        'bstack:options': { sessionName: 'My First Manual Test' } // Naming the test in BS Dashboard    
    }],
    logLevel: 'info', // How much terminal output to print    
    framework: 'mocha', // The test framework we are using    
    reporters: ['spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ], // Prints test results nicely in terminal    

    services: ['browserstack'], // Automatically handles routing traffic to BrowserStack

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

            const bsSessionUrl = `https://app-automate.browserstack.com/dashboard/v2/sessions/${driver.sessionId}`;
            allureReporter.addLink(bsSessionUrl, 'BrowserStack Video & Session Logs', 'custom');

        }
    }
};
