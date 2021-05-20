import { BasePage } from "./pageObjects/BasePage";
import { WebDriver, Builder, Capabilities, By, Key } from "selenium-webdriver";
import { SignInPage } from "./pageObjects/SignInPage";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();

const basePage = new BasePage(driver);
const signInPage = new SignInPage(driver);

beforeAll(async () => {
    //await driver.manage().window().maximize(); 
    await driver.get(basePage.url); // open main page
});

describe("Logging in and out test suite", () => {

    test("Sign in using Google account", async () => {
        await signInPage.signInWithGoogle("QA","qa.devmountain","21Devmtnqa");
    })

    test("Logging out", async() => {
        await basePage.click(By.css("span.imdb-header__account-toggle--logged-in"));
        await basePage.click(By.className("imdb-header-account-menu__sign-out"));
        await (await driver.findElement(basePage.signInBtn)).isDisplayed();
        await driver.sleep(3000);
    })

    test("Sign in using imdb account", async () => {
        await signInPage.signInWithIMDb("Tester","mail.tatiana.c@gmail.com","21Devmtnqa");
    })

})

afterAll(async () => {
    await driver.quit();
});