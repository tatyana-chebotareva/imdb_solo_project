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
    return await signInPage.signInWithIMDb("Tester","mail.tatiana.c@gmail.com","21Devmtnqa");
});

describe("Ratings and Watchlist Test Suite", () => {

    /*
    test("Add Rating", async () => {
        await driver.get("https://www.imdb.com/title/tt0473705")
        await moviePage.rateMovie(7);
        await driver.sleep(2000)
    })

    test("Edit Rating", async () => {
        await moviePage.rateMovie(6);
        await driver.sleep(2000)
    })
    
    test("Delete Rating", async () => {
        await moviePage.deleteRating();
        await driver.sleep(2000)
    })
    */
    test("Add to watchlist", async () => {
        await driver.get("https://www.imdb.com/title/tt0473705")
        await moviePage.addToWatchlist()
        await driver.sleep(3000)
    })

    test("Remove from watchlist", async () => {
        await moviePage.removeFromWatchlist()
        await driver.sleep(3000)
    })

    test("View watchlist", async () => {
        await basePage.viewDefaultWatchlist();
        await driver.sleep(2000)
        await watchlistPage.checkListIsLoaded("Your Watchlist");        
    })

})

afterAll(async () => {
    await driver.quit();
});