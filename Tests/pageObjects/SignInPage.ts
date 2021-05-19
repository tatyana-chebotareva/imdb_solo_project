import { By, Key, WebDriver } from "selenium-webdriver";
import { BasePage } from "./BasePage";

export class SignInPage extends BasePage{
    imdbEmailFld: By = By.id("ap_email");
    imdbPasswordFld: By = By.id("ap_password");
    imdbSignInBtn: By = By.id("signInSubmit");

    constructor(driver: WebDriver) {
        super(driver);
    }

    createAccountBtn : By = By.className("create-account");
    name: By = By.id("ap_customer_name");
    email: By = By.id("ap_email");
    password: By = By.id("ap_password");
    passwordCheck: By = By.id("ap_password_check");
    createBtn: By = By.id("continue");

    signInWithGoogleBtn: By = By.xpath("//span[text()='Sign in with Google']")
    signInWithIMDbBtn: By = By.xpath("//span[text()='Sign in with IMDb']")
    googleAcc: By = By.xpath("//div[text()='QA Devmountain']")
    googleEmailFld: By = By.id('identifierId');
    passwordFld: By = By.name("password");
    
    async signInWithGoogle(userName: string, login: string, password: string) {
        await this.click(this.signInBtn);
        await this.click(this.signInWithGoogleBtn);
        await this.sendKeys(this.googleEmailFld,login);
        await this.driver.sleep(1000);
        await this.addKeys(this.googleEmailFld, Key.ENTER);
        await this.driver.sleep(1000);
        await this.sendKeys(this.passwordFld, password);
        await this.driver.sleep(1000);
        await this.addKeys(this.passwordFld, Key.ENTER);
        await this.driver.sleep(1000);
        var myUserName = await (await this.driver.findElement(By.css("span.imdb-header__account-toggle--logged-in"))).getText()
        expect(myUserName).toBe(userName);
    }

    async signInWithIMDb(userName: string, login: string, password: string) {
        await this.click(this.signInBtn);
        await this.click(this.signInWithIMDbBtn);
        await this.sendKeys(this.imdbEmailFld,login);
        await this.sendKeys(this.passwordFld, password);
        await this.driver.sleep(1000);
        await this.click(this.imdbSignInBtn);
        await this.driver.sleep(1000);
        var myUserName = await (await this.driver.findElement(By.css("span.imdb-header__account-toggle--logged-in"))).getText()
        expect(myUserName).toBe(userName);
    }
}