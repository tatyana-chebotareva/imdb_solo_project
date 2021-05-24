import { BasePage } from "./pageObjects/BasePage";
import { WebDriver, Builder, Capabilities, By, Key } from "selenium-webdriver";
import { SignInPage } from "./pageObjects/SignInPage";
import * as movies from "./data/movies.json";
import * as people from "./data/people.json";
import { AdvancedSearch } from "./pageObjects/AdvancedSearch";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();

const basePage = new BasePage(driver);
const signInPage = new SignInPage(driver);
const advancedSearch = new AdvancedSearch(driver);

beforeAll(async () => {
    //await driver.manage().window().maximize(); 
    await driver.get(basePage.url); // open main page
});

describe("Search test suite", () => {

    /*
    movies.forEach((movie) => {
        test(`Search for a movie "${movie.title}" by title`, async () => {
            await basePage.search(movie.title);
            await driver.sleep (3000);
        })
    
    })

    people.forEach((person) => {
        test(`Search for an actor/actress ${person.name} by name`, async () => {
            await basePage.search(person.name);
            await driver.sleep (3000);
        })
    })
    

    test(`Advanced search by title`, async () => {
        await basePage.goToAdvancedSearch();
        await advancedSearch.checkPageIsLoaded();
        await advancedSearch.advTitleSearch(2015,2018,8.0,100000,[3,7]);
        await advancedSearch.checkResultsPageIsLoaded();
        await advancedSearch.checkResults(2015,2018,100000,[3,7]);
        await driver.sleep(2000);
    })

*/
    test(`Advanced search by name`, async () => {
        await basePage.goToAdvancedSearch();
        await advancedSearch.checkPageIsLoaded();
        await advancedSearch.advTitleSearch(2015,2018,8.0,100000,[3,7]);
        await advancedSearch.checkResultsPageIsLoaded();
        await advancedSearch.checkResults(2015,2018,100000,[3,7]);
        await driver.sleep(2000);
    })


})

afterAll(async () => {
    await driver.quit();
});