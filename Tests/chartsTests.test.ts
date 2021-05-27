import { BasePage } from "./pageObjects/BasePage";
import { WebDriver, Builder, Capabilities, By, Key } from "selenium-webdriver";
import { Charts } from "./pageObjects/Charts";
import { SignInPage } from "./pageObjects/SignInPage";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();

const basePage = new BasePage(driver);
const chartPage = new Charts(driver);
const signInPage = new SignInPage(driver);

beforeAll(async () => {
    await driver.manage().window().maximize(); 
    await driver.get(basePage.url); // open main page
    return await signInPage.signInWithIMDb("Tester","mail.tatiana.c@gmail.com","21Devmtnqa"); 
});

describe("Charts test suite", () => {

    test("Most Popular Movies", async () => {
        await basePage.goToMenuItem(basePage.menuMovies[3])
        await chartPage.chartPageIsLoaded(basePage.menuMovies[3])
    })

    test("Most Popular Celebs", async () => {
        await basePage.goToMenuItem(basePage.menuCelebs[1])
        await chartPage.celebsPageIsLoaded()
    })

    test("What to Watch", async () => {
        await basePage.goToMenuItem(basePage.menuWatch[0])
        await chartPage.wtwPageIsLoaded();
    })

    test("Latest Trailers", async () => {
        await basePage.goToMenuItem(basePage.menuWatch[1])
        await chartPage.trailersPageIsLoaded();
    })

    test("Top Rated Movies", async () => {
        await basePage.goToMenuItem(basePage.menuMovies[2])
        await chartPage.chartPageIsLoaded(basePage.menuMovies[2])
        await driver.sleep(2000)
    })

    test("Sort Top Rated Movies by Release Date", async () => {
        await chartPage.sortRelDateDesc()
        await driver.sleep(2000)
        await chartPage.checkRelDateDesc();
    })

    test("Sort Unseen Top Rated Movies by Release Date", async () => {
        await chartPage.filterUnseenOnly()
        await driver.sleep(2000)
        await chartPage.checkUnseenOnly();
        await Promise.all((await driver.findElements(By.xpath('//td[@class="titleColumn"]/a'))).map(async (webElm)=> {
            var title: string = (await webElm.getText());
            const sTitles: Array<string> = ["Interstellar", "The Wolf of Wall Street", "The Grand Budapest Hotel", "Gone Girl", "12 Years a Slave", "Ford v Ferrari", "Mad Max: Fury Road", "Spotlight"]
            for (var sTitle of sTitles) expect(title).not.toEqual(sTitle)
        }))
    })

    test("Top Rated TV Shows", async () => {
        await basePage.goToMenuItem(basePage.menuTVShows[1])
        await chartPage.chartPageIsLoaded(basePage.menuTVShows[1])
        await driver.sleep(2000)
    })

    test("Sort Top Rated TV Shows by Release Date", async () => {
        await chartPage.sortRelDateDesc()
        await driver.sleep(2000)
        await chartPage.checkRelDateDesc();        
    })

    test("Filter Unseen Top Rated TV Shows", async () => {
        await chartPage.filterUnseenOnly()
        await driver.sleep(2000)
        await chartPage.checkUnseenOnly();
        await Promise.all((await driver.findElements(By.xpath('//td[@class="titleColumn"]/a'))).map(async (webElm)=> {
            var title: string = (await webElm.getText());
            const sTitles: Array<string> = ["Friends", "Yellowstone", "Pride and Prejudice", "Battlestar Galactica", "The Simpsons", "House"]
            for (var sTitle of sTitles) expect(title).not.toEqual(sTitle)
        }))
    })

})

afterAll(async () => {
    //await driver.quit();
});