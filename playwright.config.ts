import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  // testDir: './tests/tests',
  // testDir: './tests/tests.API',
  //testDir: '.',    //will run all tests in the project

  //set timeout for all tests 
  // timeout: 60000, // 60 seconds

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  // reporter: "allure-playwright",
  reporter: [["line"], ["allure-playwright"]], //Or, if you want to use more than one reporter:

  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    //baseURL: 'https://playwright.dev',


    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',                  //'off', 'on' , 'retain-on-failure' or 'only-on-failure'
    screenshot: 'on',                         //'off', 'on' , 'retain-on-failure' or 'only-on-failure'
    video: 'on-first-retry',                        //'off', 'on' , 'retain-on-failure' or 'only-on-failure'

    // browserName: "chromium" ,          //  browser by default
    //headless:true,                   
  },

  /* Configure projects for major browsers >> custom browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // ...devices['iPhone 15 Pro Max']
        // trace: 'on-first-retry',
        // screenshot: 'on',
        // video: 'on-first-retry',
        // viewport: {width:720 , height:720},
        // ignoreHTTPSErrors:true,

      },
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     launchOptions: {
    //       args: ['--max-old-space-size=4096'], // Increase memory (4GB)
    //     },
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    // /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
