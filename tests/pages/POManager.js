const { P00_loginPage } = require("./P00_loginPage");

class POManager {
    constructor(page) {
        this.loginPge = new P00_loginPage(page);

    };

    getLoginPage() {
        return this.loginPge
    };







}
module.exports = { POManager }; 