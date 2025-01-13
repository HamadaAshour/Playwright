import { test, expect, request } from '@playwright/test';
// @ts-ignore
const dataSet = JSON.parse(JSON.stringify(require('../data/APIloginData.json')));


//------------------------------------------------------------------------------------
test('@API token pass', async ({ page }) => {
    const fullURL = dataSet.URL + dataSet.loginRoot;
    const apiContext = await request.newContext();
    const response = await apiContext.post(
        fullURL,
        {
            data: dataSet.loginBody,
            headers: { 'Content-Type': 'application/json' }
        },
    );
    // If response is not OK, log the response text for debugging
    if (!response.ok()) {
        console.log("Response Status:", response.status());
        console.log("Response Headers:", response.headers());
        console.error("Error Response Text:", await response.text());
    }
    expect(await response.ok()).toBeTruthy();
    const responseJSON = await response.json();
    // console.log(responseJSON);
    let token = responseJSON.token;
    let tokepasswordNeedsReset = responseJSON.passwordNeedsReset;
    expect(tokepasswordNeedsReset).toEqual(false)
    console.log(test.info().title + " >> passed");
});

test('@API token getMethod', async ({ page }) => {
    const fullURL = dataSet.URL + dataSet.loginRoot;
    const apiContext = await request.newContext();
    const response = await apiContext.get(
        fullURL,
        {
            data: dataSet.loginBody,
            headers: { 'Content-Type': 'application/json' }
        },
    );
    // If response is not OK, log the response text for debugging
    if (!response.ok()) {
        console.log("Response Status:", response.status());
        console.error("Error Response Text:", await response.text());
    }
    expect(await response.ok()).toBeFalsy()
    console.log(test.info().title + " >> passed");
});

test('@API token wrong root ', async ({ page }) => {
    const fullURL = dataSet.URL + dataSet.loginRoot + "Error";
    const apiContext = await request.newContext();
    const response = await apiContext.post(
        fullURL,
        {
            data: dataSet.loginBody,
            headers: { 'Content-Type': 'application/json' }
        },
    );
    // If response is not OK, log the response text for debugging
    if (!response.ok()) {
        console.log("Response Status:", response.status());
        console.error("Error Response Text:", await response.text());
    }
    expect(await response.ok()).toBeFalsy()
    console.log(test.info().title + " >> passed");
});

test('@API token wrong emaile', async ({ page }) => {
    const fullURL = dataSet.URL + dataSet.loginRoot;
    const apiContext = await request.newContext();
    const response = await apiContext.post(
        fullURL,
        {
            data: {
                "email": "wrongemaile@wrong.com",
                "username": null,
                "password": dataSet.loginPassword
            },
            headers: { 'Content-Type': 'application/json' }
        },
    );
    // If response is not OK, log the response text for debugging
    if (!response.ok()) {
        console.log("Response Status:", response.status());
        console.error("Error Response Text:", await response.text());
    }
    expect(await response.ok()).toBeFalsy();
    console.log(test.info().title + " >> passed");
});

test('@API token wrong password', async ({ page }) => {
    const fullURL = dataSet.URL + dataSet.loginRoot;
    const apiContext = await request.newContext();
    const response = await apiContext.post(
        fullURL,
        {
            data: {
                "email": dataSet.loginEmail,
                "username": null,
                "password": "wrong passworf"
            },
            headers: { 'Content-Type': 'application/json' }
        },
    );
    // If response is not OK, log the response text for debugging
    if (!response.ok()) {
        console.log("Response Status:", response.status());
        console.error("Error Response Text:", await response.text());
    }
    expect(await response.ok()).toBeFalsy();
    console.log(test.info().title + " >> passed");
});

test('@API token wrong email and password', async ({ page }) => {
    const fullURL = dataSet.URL + dataSet.loginRoot;
    const apiContext = await request.newContext();
    const response = await apiContext.post(
        fullURL,
        {
            data: {
                "email": "wrongemail@wrong,com",
                "username": null,
                "password": "wrong passworf"
            },
            headers: { 'Content-Type': 'application/json' }
        },
    );
    // If response is not OK, log the response text for debugging
    if (!response.ok()) {
        console.log("Response Status:", response.status());
        console.error("Error Response Text:", await response.text());
    }
    expect(await response.ok()).toBeFalsy();
    console.log(test.info().title + " >> passed");
});

test('@API token empty email', async ({ page }) => {
    const fullURL = dataSet.URL + dataSet.loginRoot;
    const apiContext = await request.newContext();
    const response = await apiContext.post(
        fullURL,
        {
            data: {
                "email": "",
                "username": null,
                "password": dataSet.loginPassword
            },
            headers: { 'Content-Type': 'application/json' }
        },
    );
    // If response is not OK, log the response text for debugging
    if (!response.ok()) {
        console.log("Response Status:", response.status());
        console.error("Error Response Text:", await response.text());
    }
    expect(await response.ok()).toBeFalsy();
    console.log(test.info().title + " >> passed");
});

test('@API token empty password', async ({ page }) => {
    const fullURL = dataSet.URL + dataSet.loginRoot;
    const apiContext = await request.newContext();
    const response = await apiContext.post(
        fullURL,
        {
            data: {
                "email": dataSet.loginEmail,
                "username": null,
                "password": ""
            },
            headers: { 'Content-Type': 'application/json' }
        },
    );
    // If response is not OK, log the response text for debugging
    if (!response.ok()) {
        console.log("Response Status:", response.status());
        console.error("Error Response Text:", await response.text());
    }
    expect(await response.ok()).toBeFalsy();
    console.log(test.info().title + " >> passed");
});

test('@API token empty email and password', async ({ page }) => {
    const fullURL = dataSet.URL + dataSet.loginRoot;
    const apiContext = await request.newContext();
    const response = await apiContext.post(
        fullURL,
        {
            data: {
                "email": "",
                "username": null,
                "password": ""
            },
            headers: { 'Content-Type': 'application/json' }
        },
    );
    // If response is not OK, log the response text for debugging
    if (!response.ok()) {
        console.log("Response Status:", response.status());
        console.error("Error Response Text:", await response.text());
    }
    expect(await response.ok()).toBeFalsy();
    console.log(test.info().title + " >> passed");
});

test('@API token empty header JSON', async ({ page }) => {
    const fullURL = dataSet.URL + dataSet.loginRoot;
    const apiContext = await request.newContext();
    const response = await apiContext.post(
        fullURL,
        {
            data: dataSet.loginBody,
            headers: {}
        },
    );
    // If response is not OK, log the response text for debugging
    if (!response.ok()) {
        console.log("Response Status:", response.status());
        console.error("Error Response Text:", await response.text());
    }
    expect(await response.ok()).toBeTruthy();
    console.log(test.info().title + " >> passed");
});



