# Mobile Automation Proof of Concept (POC)

An enterprise-grade mobile automation framework built with **WebdriverIO (v8)**, **Appium (2.x)**, and **TypeScript** using the **Page Object Model (POM)** design pattern. 

This project supports dual-environment execution: running locally on **Android Studio Emulators** for rapid development/debugging and remotely on real physical devices via **BrowserStack App Automate**.

---

## 🛠️ Tech Stack & Framework Architecture

* **Language:** TypeScript (ES2022 / ES Modules)
* **Automation Driver:** Appium 2.x (using `uiautomator2@3.7.0` for Android)
* **Test Framework & Runner:** WebdriverIO v8 (`@wdio/cli`) with Mocha BDD
* **Design Pattern:** Page Object Model (POM) with Encapsulation & Abstraction
* **Assertion Engine:** `expect-webdriverio`
* **Reporting:** Visual Allure HTML Reports & Spec Terminal Reporter
* **Data Management:** `dotenv` for environment secrets & `exceljs` for Excel data-driven testing

---

## 📁 Project Directory Structure

```text
appium-automation/
├── .env                     # Local environment secrets (BrowserStack keys & credentials)
├── .gitignore               # Excludes node_modules, .env, and report directories
├── package.json             # Manifest declaring ESM mode, scripts, and dependencies
├── tsconfig.json            # TypeScript compiler rules & ts-node transpile options
├── wdio.local.conf.ts       # WebdriverIO config for local Android Studio Emulators
├── wdio.bs.conf.ts          # WebdriverIO config for BrowserStack cloud real devices
├── .vscode/
│   └── launch.json          # VS Code debug launcher for stepping through code with breakpoints
├── apps/
│   └── Demo_App.apk         # Native Android application binary under test
├── test/
│   ├── pageobjects/         # Page Object classes (Locators and Page Actions)
│   │   ├── page.ts          # Base Page class abstracting common driver interactions
│   │   └── catalog.page.ts  # Domain Page Object encapsulating locators & workflows
│   ├── specs/               # Mocha E2E test suites
│   │   ├── checkout.test.ts # E2E Checkout and Login redirection test file
│   │   └── e2e-cart.test.ts # E2E Product selection and cart badge count test file
│   └── utils/
│       └── excelUtil.ts     # Excel utility supporting CRUD operations with ExcelJS

```

---

## 🚀 Setup & Installation Prerequisites

### 1. System Requirements (macOS)

Ensure the following tools are installed on your workstation:

* **Homebrew**: Package manager for macOS
* **Node.js**: v20+ LTS (`brew install node`)
* **Java JDK**: OpenJDK 17 (`brew install openjdk@17`)
* **Android Studio**: Installed with Android SDK Platform 34 & Android Platform-Tools

### 2. Environment Variables Configuration

Ensure your `~/.zshrc` profile includes the Android SDK paths:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin

```

### 3. Project Dependencies Installation

Clone this repository and run the setup commands:

```bash
# Install node packages
npm install

# Install local Appium UiAutomator2 driver
npx appium driver install uiautomator2@3.7.0

```

---

## 💻 How to Run Tests

### 1. Local Execution (Android Emulator)

1. Open **Android Studio > Device Manager** and launch your virtual device (e.g., `Pixel_8_API_34`).
2. Verify ADB connectivity:
```bash
adb devices

```


3. Run the local test suite:
```bash
npm run test:local

```



*Note: WebdriverIO automatically manages the Appium server background process locally via `@wdio/appium-service`. Do not run the `appium` command manually in terminal.*

### 2. Cloud Execution (BrowserStack Real Devices)

1. Upload your target `.apk` file to BrowserStack via cURL:
```bash
curl -u "YOUR_USERNAME:YOUR_ACCESS_KEY" \\
     -X POST "[https://api-cloud.browserstack.com/app-automate/upload](https://api-cloud.browserstack.com/app-automate/upload)" \\
     -F "file=@./apps/Demo_App.apk"

```


2. Populate the returned `bs://` ID into your `.env` file:
```env
BROWSERSTACK_USERNAME=your_username
BROWSERSTACK_ACCESS_KEY=your_access_key
BROWSERSTACK_APP_ID=bs://<hashed-app-id>

```


3. Execute the BrowserStack test suite:
```bash
npm run test:bs

```



---

## 🎯 Running & Filtering Specific Spec Files

To run a single test file instead of the entire spec folder, append the `--spec` flag:

```bash
# Run checkout test locally
npm run test:local -- --spec ./test/specs/checkout.test.ts

# Run checkout test on BrowserStack
npm run test:bs -- --spec ./test/specs/checkout.test.ts

```

---

## 🐛 Debugging Guide

### 1. VS Code Native Breakpoints (Recommended)

1. Open any spec file or Page Object in VS Code.
2. Click to the left of any line number to set a **Red Breakpoint Dot**.
3. Press **`F5`** on your keyboard to launch the debugger. Use **`F10`** to step over lines and **`F5`** to continue.

### 2. Interactive Terminal REPL Mode

Insert `await browser.debug()` into your code. Execution will pause, and your terminal will switch to an interactive `dev>` REPL shell.

* To resume execution and move to the next step, type **`.exit`** (with the leading dot) and press Enter.

---

## 📊 Generating Visual Allure Reports

To generate and view interactive HTML reports with execution timelines, charts, and automatic failure screenshots:

```bash
# 1. Execute tests (generates raw files in allure-results/)
npm run test:local

# 2. Compile and open the HTML report in your browser
npx allure generate allure-results --clean && npx allure open

```

---

## 🔑 Locator Strategy Best Practices

For optimal performance and cross-platform maintainability, elements are located using these strategies in order of priority:

1. **Accessibility ID (`~selector`):** Primary choice for buttons and inputs (`content-desc` on Android, `accessibilityIdentifier` on iOS).
2. **Resource ID (`#id`):** Native Android component IDs (e.g., `$('#android:id/button1')`).
3. **Child TextView XPaths:** When validating text labels inside container layouts, target child `TextView` nodes directly to avoid empty string returns.
"""

doc.add_paragraph(readme_content)

output_file = "/mnt/data/README.docx"
doc.save(output_file)
print("README.docx generated successfully.")

```

```text?code_stdout&code_event_index=1
README.docx generated successfully.


```

Your downloadable `README.docx` file is ready:

---

### Copy-Paste Markdown Text (`README.md`)

If you want to paste the Markdown directly into your VS Code editor, copy the block below:

```markdown
# Mobile Automation Proof of Concept (POC)

An enterprise-grade mobile automation framework built with **WebdriverIO (v8)**, **Appium (2.x)**, and **TypeScript** using the **Page Object Model (POM)** design pattern[cite: 1, 15]. 

This project supports dual-environment execution: running locally on **Android Studio Emulators** for rapid development/debugging and remotely on real physical devices via **BrowserStack App Automate**[cite: 1, 15].

---

## 🛠️ Tech Stack & Framework Architecture

* **Language:** TypeScript (ES2022 / ES Modules)[cite: 1, 14, 15]
* **Automation Driver:** Appium 2.x (using `uiautomator2@3.7.0` for Android)[cite: 1, 15]
* **Test Framework & Runner:** WebdriverIO v8 (`@wdio/cli`) with Mocha BDD[cite: 1, 14, 15]
* **Design Pattern:** Page Object Model (POM) with Encapsulation & Abstraction[cite: 1, 15]
* **Assertion Engine:** `expect-webdriverio`[cite: 1, 15]
* **Reporting:** Visual Allure HTML Reports & Spec Terminal Reporter[cite: 12, 15]
* **Data Management:** `dotenv` for environment secrets & `exceljs` for Excel data-driven testing[cite: 1, 14, 15]

---

## 📁 Project Directory Structure

```text
appium-automation/
├── .env                     # Local environment secrets (BrowserStack keys & credentials)
├── .gitignore               # Excludes node_modules, .env, and report directories
├── package.json             # Manifest declaring ESM mode, scripts, and dependencies
├── tsconfig.json            # TypeScript compiler rules & ts-node transpile options
├── wdio.local.conf.ts       # WebdriverIO config for local Android Studio Emulators
├── wdio.bs.conf.ts          # WebdriverIO config for BrowserStack cloud real devices
├── .vscode/
│   └── launch.json          # VS Code debug launcher for stepping through code with breakpoints
├── apps/
│   └── Demo_App.apk         # Native Android application binary under test
├── test/
│   ├── pageobjects/         # Page Object classes (Locators and Page Actions)
│   │   ├── page.ts          # Base Page class abstracting common driver interactions
│   │   └── catalog.page.ts  # Domain Page Object encapsulating locators & workflows
│   ├── specs/               # Mocha E2E test suites
│   │   ├── checkout.test.ts # E2E Checkout and Login redirection test file
│   │   └── e2e-cart.test.ts # E2E Product selection and cart badge count test file
│   └── utils/
│       └── excelUtil.ts     # Excel utility supporting CRUD operations with ExcelJS

```

---

## 🚀 Setup & Installation Prerequisites

### 1. System Requirements (macOS)

Ensure the following tools are installed on your workstation:

* **Homebrew**: Package manager for macOS


* **Node.js**: v20+ LTS (`brew install node`)


* **Java JDK**: OpenJDK 17 (`brew install openjdk@17`)


* **Android Studio**: Installed with Android SDK Platform 34 & Android Platform-Tools



### 2. Environment Variables Configuration

Ensure your `~/.zshrc` profile includes the Android SDK paths:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin

```

### 3. Project Dependencies Installation

Clone this repository and run the setup commands:

```bash
# Install node packages
npm install

# Install local Appium UiAutomator2 driver
npx appium driver install uiautomator2@3.7.0

```

---

## 💻 How to Run Tests

### 1. Local Execution (Android Emulator)

1. Open **Android Studio > Device Manager** and launch your virtual device (e.g., `Pixel_8_API_34`).


2. Verify ADB connectivity:
```bash
adb devices

```


3. Run the local test suite:


```bash
npm run test:local

```



Note: WebdriverIO automatically manages the Appium server background process locally via `@wdio/appium-service`. Do not run the `appium` command manually in terminal.

### 2. Cloud Execution (BrowserStack Real Devices)

1. Upload your target `.apk` file to BrowserStack via cURL:


```bash
curl -u "YOUR_USERNAME:YOUR_ACCESS_KEY" \
     -X POST "[https://api-cloud.browserstack.com/app-automate/upload](https://api-cloud.browserstack.com/app-automate/upload)" \
     -F "file=@./apps/Demo_App.apk"

```


2. Populate the returned `bs://` ID into your `.env` file:


```env
BROWSERSTACK_USERNAME=your_username
BROWSERSTACK_ACCESS_KEY=your_access_key
BROWSERSTACK_APP_ID=bs://<hashed-app-id>

```


3. Execute the BrowserStack test suite:


```bash
npm run test:bs

```



---

## 🎯 Running & Filtering Specific Spec Files

To run a single test file instead of the entire spec folder, append the `--spec` flag:

```bash
# Run checkout test locally
npm run test:local -- --spec ./test/specs/checkout.test.ts

# Run checkout test on BrowserStack
npm run test:bs -- --spec ./test/specs/checkout.test.ts

```

---

## 🐛 Debugging Guide

### 1. VS Code Native Breakpoints (Recommended)

1. Open any spec file or Page Object in VS Code.


2. Click to the left of any line number to set a **Red Breakpoint Dot**.


3. Press **`F5`** on your keyboard to launch the debugger. Use **`F10`** to step over lines and **`F5`** to continue.



### 2. Interactive Terminal REPL Mode

Insert `await browser.debug()` into your code. Execution will pause, and your terminal will switch to an interactive `dev>` REPL shell.

* To resume execution and move to the next step, type **`.exit`** (with the leading dot) and press Enter.



---

## 📊 Generating Visual Allure Reports

To generate and view interactive HTML reports with execution timelines, charts, and automatic failure screenshots:

```bash
# 1. Execute tests (generates raw files in allure-results/)
npm run test:local

# 2. Compile and open the HTML report in your browser
npx allure generate allure-results --clean && npx allure open

```

---

## 🔑 Locator Strategy Best Practices

For optimal performance and cross-platform maintainability, elements are located using these strategies in order of priority:

1. **Accessibility ID (`~selector`):** Primary choice for buttons and inputs (`content-desc` on Android, `accessibilityIdentifier` on iOS).


2. **Resource ID (`#id`):** Native Android component IDs (e.g., `$('#android:id/button1')`).


3. **Child TextView XPaths:** When validating text labels inside container layouts, target child `TextView` nodes directly to avoid empty string returns.



```

```