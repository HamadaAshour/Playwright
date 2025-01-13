class T00_APIToken {
    constructor (apiContext, APIURL, APIRoot, APIPayload) {
        this.apiContext = apiContext;
        this.URL = APIURL;
        this.APIRoot = APIRoot;
        this.APIPayload = APIPayload;
    }

    async getToken() {
        const fullURL = this.URL + this.APIRoot;
        try {
            const response = await this.apiContext.post(fullURL, {
                data: this.APIPayload,
                headers: { 'Content-Type': 'application/json' }
            });
    
            // Log the full response for debugging
            // console.log("Response Status:", response.status());
            // console.log("Response Headers:", response.headers());
            const responseText = await response.text();
            // console.log("Response Text:", responseText);
    
            // Check if the response is OK
            if (!response.ok()) {
                throw new Error(`API request failed with status ${response.status()}: ${responseText}`);
            }
    
            const responseJSON = JSON.parse(responseText);
            if (!responseJSON.token) {
                throw new Error('Token not found in API response. Check the login API response structure.');
            }
    
            const token = responseJSON.token;
            // console.log("Token Retrieved Successfully:", token);
            return token;
        } catch (error) {
            console.error("Error in getToken:", error.message);
            throw error; // Re-throw the error to be caught in the calling test
        }
    }
    
}
module.exports = { T00_APIToken }