class P00_loginPage {

    constructor (page) {
        this.page = page;
        this.userNameInput = page.getByLabel('Username');
        this.passwordInput = page.getByLabel('Password');
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.loginMessage = page.locator('h1');
     
    };
z
    async login(Username, Password) {
        await this.userNameInput.fill(Username);
        await this.passwordInput.fill(Password);
        await this.signInButton.click();
        
    };

    getLoginMessage() {
        return this.loginMessage;
    }
}
module.exports = { P00_loginPage };









;