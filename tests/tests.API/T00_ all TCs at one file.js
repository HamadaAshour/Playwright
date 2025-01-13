import { test, expect, request } from '@playwright/test';
import { faker } from '@faker-js/faker';
// @ts-ignore
const dataSet = JSON.parse(JSON.stringify(require('../data/APIloginData.json')));
let token;

//------------------------------------------------------------------------------------
test.beforeEach('login by API', async ({ }) => {
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
        console.error("Error Response Text:", await response.text());
    }
    expect(await response.ok()).toBeTruthy();
    const responseJSON = await response.json();
    token = responseJSON.token;
    // console.log("token :\n" + token);
});

test('get UserProfile data', async ({ page }) => {
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
        headers: { Authorization: `Bearer ${token}` }
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

test('add new region', async ({ page }) => {
    if (!token) {
        throw new Error('Token is not set. Login API might have failed.');
    }
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    const fullURL = dataSet.URL + dataSet.addNewRegionRoot;
    const randomName = faker.name.firstName();
    dataSet.addNewRegionBody.regionName = randomName;
    const apiContext = await request.newContext();
    const response = await apiContext.post(
        fullURL, {
        data: dataSet.addNewRegionBody,
        headers: { Authorization: `Bearer ${token}` }
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
