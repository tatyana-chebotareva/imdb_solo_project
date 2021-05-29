import { BasePage } from "./pageObjects/BasePage";
import { WebDriver, Builder, Capabilities, By, Key } from "selenium-webdriver";
import { MoviePage } from "./pageObjects/MoviePage";
import { SignInPage } from "./pageObjects/SignInPage";
import { Watchlist } from "./pageObjects/Watchlist";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();

const basePage = new BasePage(driver);
const moviePage = new MoviePage(driver);
const signInPage = new SignInPage(driver);
const watchlistPage = new Watchlist(driver);

beforeAll(async () => {
    await driver.manage().window().maximize(); 
    await driver.get(basePage.url); // open main page
    //return await signInPage.signInWithIMDb("Tester","mail.tatiana.c@gmail.com","21Devmtnqa");
    return await signInPage.signInWithGoogle("QA","qa.devmountain","21Devmtnqa")
});

describe("Watchlist Test Suite", () => {
    
    test("View watchlist", async () => {
        await basePage.viewDefaultWatchlist();
        await driver.sleep(2000)
        await watchlistPage.checkListIsLoaded("Your Watchlist");        
    })

    test ("Sort by IMDb Rating", async () => {
        await watchlistPage.sortByIMDbRating();
        await driver.sleep(2000)
    })

    test ("Sort by Release Date", async () => {
        await watchlistPage.sortByYear();
        await driver.sleep(2000)
    })

    test ("Sort by Runtime", async () => {
        await watchlistPage.sortByRuntime();
        await driver.sleep(2000)
    })

})

afterAll(async () => {
    await driver.quit();
});