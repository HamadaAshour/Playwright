import { test, expect, request } from '@playwright/test';
import { faker } from '@faker-js/faker';
const {T00_APIToken} = require('./T00_APIToken');
// @ts-ignore
const dataSet = JSON.parse(JSON.stringify(require('../data/APIloginData.json')));
let token;

//------------------------------------------------------------------------------------
test.beforeAll(async ({ }) => {
    const apiContext = await request.newContext();
    const APIToken = new T00_APIToken (apiContext, dataSet.URL, dataSet.loginRoot, dataSet.loginBody);
    token = await APIToken.getToken(); 

    //Debug
    if (!token || typeof token !== 'string') {
        throw new Error('Failed to retrieve a valid token. Check your login API response.');
    }
    // console.log("Retrieved Token:", token);
});

test('@API get UserProfile passed', async ({ page }) => {
    if (!token) {
        throw new Error('Token is not set. Login API might have failed.');
    }

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    const fullURL = dataSet.URL + dataSet.getUserProfileRoot;

    const apiContext = await request.newContext();
    const response = await apiContext.get(
        fullURL, {
        headers: { Authorization: `Bearer ${token.trim()}` }
    });

    console.log("Request URL:", fullURL);
    console.log("Response Status:", response.status());

    // If response is not OK, log the response text for debugging
    if (!response.ok()) {
        console.error("Error Response Text:", await response.text());
    }

    expect(response.ok()).toBeTruthy();

    const responseJSON = await response.json();
    console.log("Response Data:", responseJSON);
});

test('@API get UserProfile wrongMethod', async ({ page }) => {
    if (!token) {
        throw new Error('Token is not set. Login API might have failed.');
    }

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    const fullURL = dataSet.URL + dataSet.getUserProfileRoot;

    const apiContext = await request.newContext();
    const response = await apiContext.post(
        fullURL, {
        headers: { Authorization: `Bearer ${token.trim()}` }
    });

    // console.log("Request URL:", fullURL);
    console.log("Response Status:", response.status());

    // If response is not OK, log the response text for debugging
    if (!response.ok()) {
        console.error("Error Response Text:", await response.text());
    }

    expect(response.ok()).toBeFalsy();
});
