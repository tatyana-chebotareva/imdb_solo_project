import { Actions, By, Key, until, WebDriver, WebElement } from "selenium-webdriver";
import { BasePage } from "./BasePage";

/**
 * This is a class representing Advanced search page
 */
export class Charts extends BasePage{

    driver: WebDriver;

    /**
     * Create a chart page
     * @param {WebDriver} driver - the driver object the page object should interact with
     */
    constructor(driver: WebDriver) {
        super(driver);
    }

    charts:By = By.xpath('//h3[text()="IMDb Charts"]')
    chartLister: By = By.className("lister")
    chartRateTitleColumn: By = By.xpath('//th[text()="Rank & Title"]')
    chartIMDbRatingColumn: By = By.xpath('//th[text()="IMDb Rating"]')
    chartYourRatingColumn: By = By.xpath('//th[text()="Your Rating"]')
    chartItems: By = By.xpath('//*[@class="lister-list"]/tr')

    totalRes: By = By.xpath('//div[@class="desc"]/span')
    resultsHeader: By = By.css('h1.header');
    names: By = By.xpath('//h3[@class="lister-item-header"]/a')

    headerWhatToWatch:By = By.xpath('//h1[@class="ipc-title__text"][text()="What to Watch"]')
    watchGuide: By = By.xpath('//span[text()="WATCH GUIDE"]')
    wtwCards: By = By.className("ipc-slate-card")

    movieCards: By = By.className("ipc-poster-card")
    trendingTrailers: By = By.xpath('//span[text()="TRENDING TRAILERS"]')
    headerMoviesTVTrailers:By = By.xpath('//h1[@class="ipc-title__text"][text()="Movie & TV trailers"]')
    seen: By = By.xpath(`//div[@class='hide-seen']/label[text()="Hide titles I've seen"]`)
    seenCheckbox: By = By.xpath(`//div[@class="hide-seen"]/input`)

    moviesYear: By = By.className("secondaryInfo");

    sortBy: By = By.id("lister-sort-by-options")
    releaseDateOption: By = By.xpath('//*[@class="lister-sort-by"]/option[3]')

        

    async chartPageIsLoaded(chartName){
        await (await this.driver.findElement(this.charts)).isDisplayed()
        //await (await this.driver.findElement(By.xpath(`//h1[text()="${chartName}"]`))).isDisplayed()
        await (await this.driver.findElement(this.chartRateTitleColumn)).isDisplayed()
        await (await this.driver.findElement(this.chartIMDbRatingColumn)).isDisplayed()
        await (await this.driver.findElement(this.chartYourRatingColumn)).isDisplayed()
        expect((await this.driver.findElements(this.chartItems)).length).toBeGreaterThanOrEqual(100)
    }

    async celebsPageIsLoaded(){
        expect((await (await this.driver.findElement(this.totalRes)).getText()).toLowerCase()).toContain("names")
        expect(await (await this.driver.findElement(this.resultsHeader)).getText()).toContain(`Males/Females (Sorted by Popularity Ascending)`)
        expect((await this.driver.findElements(this.names)).length).toBeGreaterThanOrEqual(50)
    }

    async wtwPageIsLoaded() {
        await (await this.driver.findElement(this.headerWhatToWatch)).isDisplayed() 
        await (await this.driver.findElement(this.watchGuide)).isDisplayed()
        expect((await this.driver.findElements(this.wtwCards)).length).toBeGreaterThanOrEqual(6)
    }

    async trailersPageIsLoaded() {
        await (await this.driver.findElement(this.headerMoviesTVTrailers)).isDisplayed() 
        await (await this.driver.findElement(this.trendingTrailers)).isDisplayed()
        expect((await this.driver.findElements(this.movieCards)).length).toBeGreaterThanOrEqual(6)
    }

    async filterUnseenOnly() {
        if ((await this.driver.findElement(this.seenCheckbox)).isSelected()) {
            this.click(this.seen)
        }
    }

    async checkUnseenOnly() {
        expect((await this.driver.findElement(this.seenCheckbox)).isSelected()).toBeTruthy()
    }

    async sortRelDateDesc() {
        await this.click(this.sortBy);
        await this.click(this.releaseDateOption)        
    }

    async checkRelDateDesc() {
        var elements = await this.driver.findElements(this.moviesYear);
        var years = await Promise.all(elements.map(async (webElm)=> {
            var year: number =+ (await webElm.getText()).replace(/\D/g, '');
            return year;
        }))
        console.log(years)
        for (let i=0;i<years.length-1;i++) {
            if (years[i]!=0) expect(years[i]).toBeGreaterThanOrEqual(years[i+1])
        } 
    }
}