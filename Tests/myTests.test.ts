import { BasePage } from "./pageObjects/BasePage";
import { WebDriver, Builder, Capabilities, By } from "selenium-webdriver";
import { OtherPage } from "./pageObjects/OtherPage";
import * as dataaset from "./data/dataset.json";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();

const basePage = new BasePage(driver);
const otherPage = new OtherPage(driver);

beforeAll(async () => {
    await driver.manage().window().maximize(); //filters are displayed differently if width is less than 995
    await driver.get(basePage.url); // open main page
});

describe("My test suite", () => {

    // https://dmutah.atlassian.net/browse/***
    test("Open the main page", async () => {
        //
    })

    dataaset.forEach((item) => {
        test("No results for bad search terms", async () => {
            //await basePage.search(item.term); // search itself
        })
    })

})

afterAll(async () => {
    await driver.quit();
});