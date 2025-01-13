import { test, expect } from '@playwright/test';
// @ts-ignore
const dataSet = JSON.parse(JSON.stringify(require('../data/loginData.json')));
const { POManager } = require('../pages/POManager');
let pOManager;

//------------------------------------------------------------------------------------
test.beforeEach(async ({ page }) => {
    pOManager = new POManager(page);
    await page.goto(dataSet.URL);
});

test.afterEach(async ({ page }) => {
    await page.close();
});

//------------------------------------------------------------------------------------
test('@Web login successfully', async ({ page }) => {
    test.setTimeout(60000);
    await pOManager.getLoginPage().login(dataSet.userName, dataSet.password);
    //wating type =>1
    await pOManager.getLoginPage().getLoginMessage().waitFor({ state: 'visible' });
    //wating type =>2
    await expect(pOManager.getLoginPage().getLoginMessage()).toBeVisible();
    await expect(pOManager.getLoginPage().getLoginMessage()).toContainText('Welcome ' + dataSet.userName);
    //wating type =>3
    // await page.waitForLoadState("networkidle")
    console.log(await pOManager.getLoginPage().getLoginMessage().textContent());
});


