import { By, Key, until, WebDriver, WebElement } from "selenium-webdriver";
import { BasePage } from "./BasePage";

export class Watchlist extends BasePage{

    constructor(driver: WebDriver) {
        super(driver);
    }

    rateThisBtn: By = By.className("star-rating-button");
    yourRate: By = By.className("star-rating-value");
    deleteRatingBtn: By = By.className("star-rating-delete");
    noRate: By = By.className("star-rating-text");
    wlRibbon: By = By.className("wl-ribbon");
    titlesInWL: By = By.className("lister-details");

    moviesYear: By = By.className("lister-item-year");
    moviesRuntime: By = By.className("runtime");
    moviesGenres: By = By.className("genre");
    moviesIMDbRating: By = By.className("ratings-imdb-rating");

    sorter: By = By.id("lister-sort-by-options")
    sorterIMDbRating: By = By.xpath("//option[text()='IMDb Rating']")
    sorterYear: By = By.xpath("//option[text()='Release Date']")
    sorterRuntime: By = By.xpath("//option[text()='Runtime']")

    refiner: By = By.xpath("//button[text()='REFINE']")
    refinerControls: By = By.className('lister-expanded-controls');

    genres: Array<string> = ["Comedy","Drama"]    
    refinerGenres: By = By.xpath("//span[text()='Genres']");
    refinerComedy: By = By.xpath("//span[text()='Comedy']")
    refinerDrama: By = By.xpath("//span[text()='Drama']")

    refinerYear: By = By.xpath("//span[text()='Release Year']")
    refinerYearSince: By = By.xpath('//fieldset/div/input[1]');
    refinerYearTo: By = By.xpath('//fieldset/div/input[2]');
    refinerYearGo: By = By.className("faceter-search-btn")

    refineCancelBtn: By = By.className("list-cancel")


    async rateMovie(stars: number) {
        await this.click(this.rateThisBtn)
        var starLocator: string = `[title='Click to rate: ${stars}']`
        await this.click(By.css(starLocator));
        await this.driver.sleep(1000);
        expect(await (await this.driver.findElement(this.yourRate)).getText()).toBe(stars.toString());
    }

    async deleteRating() {
        await this.click(this.rateThisBtn);
        await this.click(this.deleteRatingBtn);
        await this.driver.sleep(1000);
        expect(await (await this.driver.findElement(this.noRate)).getText()).toBe("Rate This");
    }

    async checkListIsLoaded(wlName: string) {
        await this.driver.wait(until.elementLocated(this.titlesInWL));
        await this.driver.wait(until.elementLocated(By.xpath(`//h1[text()="${wlName}"]`)));
        expect((await (await this.driver.findElement(this.titlesInWL)).getText()).toLowerCase()).toContain("titles");
    }

    async sortByIMDbRating() {
        await this.click(this.sorter);
        await this.click(this.sorterIMDbRating);
        await this.driver.sleep(1000);
        var elements = await this.driver.findElements(this.moviesIMDbRating);
        var ratings = await Promise.all(elements.map(async (webElm)=> {
            var rating: number =+ await webElm.getText();
            return rating;
        }))
        await this.driver.sleep(1000);
        for (let i = 0; i < elements.length-1; i++) {
            expect(ratings[i]).toBeGreaterThanOrEqual(ratings[i+1])
        } 
    }

    async sortByYear() {
        await this.click(this.sorter);
        await this.click(this.sorterYear);
        await this.driver.sleep(1000);
        var elements = await this.driver.findElements(this.moviesYear);
        var years = await Promise.all(elements.map(async (webElm)=> {
            var year: number =+ await webElm.getText();
            return year;
        }))
        await this.driver.sleep(1000);
        for (let i = 0; i < elements.length-1; i++) {
            expect(years[i]).toBeGreaterThanOrEqual(years[i+1])
        } 
    }

    async sortByRuntime() {
        await this.click(this.sorter);
        await this.click(this.sorterRuntime);
        await this.driver.sleep(1000);
        var elements = await this.driver.findElements(this.moviesRuntime);
        var runtimes = await Promise.all(elements.map(async (webElm)=> {
            var runtime: number =+ (await webElm.getText()).replace(/\D/g, '');
            //console.log(runtime)
            return runtime;
        }))
        await this.driver.sleep(1000);
        for (let i = 0; i < elements.length-1; i++) {
            expect(runtimes[i]).toBeGreaterThanOrEqual(runtimes[i+1])
        } 
    }

    async refineByGenre(genre: string) {
        if (!(await (await this.driver.findElement(this.refinerControls)).isDisplayed())) {
            await this.click(this.refiner);
        }
        await this.click(this.refinerGenres);
        var elmBy : By = By.xpath(`//span[text()='${genre}']`)
        await this.scrollIntoViewBy(elmBy)
        await this.click(elmBy); 
        await this.driver.sleep(1000);

        var elements = await this.driver.findElements(this.moviesGenres);
        var allGenres = await Promise.all(elements.map(async (webElm)=> {
            var movieGenres: string = (await webElm.getText()).toLowerCase();
            return movieGenres;
        }))
        await this.driver.sleep(1000);
        for (let i = 0; i < elements.length; i++) {
            expect(allGenres[i]).toContain(genre.toLowerCase())
        } 
        await this.driver.sleep(1000);
    }

    async refineByYear(yearSince: number, yearTo: number) {
        if (!(await (await this.driver.findElement(this.refinerControls)).isDisplayed())) {
            await this.click(this.refiner);
        }
        await this.click(this.refinerYear);
        if (yearSince!=null) await this.sendKeys(this.refinerYearSince,`${yearSince}`)
        if (yearTo!=null) await this.sendKeys(this.refinerYearTo,`${yearTo}`)
        await this.click(this.refinerYearGo)
        await this.driver.sleep(1000);

        var elements = await this.driver.findElements(this.moviesYear);
        var allYears = await Promise.all(elements.map(async (webElm)=> {
            var year: number =+ await webElm.getText();
            return year;
        }))
        await this.driver.sleep(1000);
        for (let i = 0; i < elements.length; i++) {
            if (yearSince!=null) expect(allYears[i]).toBeGreaterThanOrEqual(yearSince)
            if (yearTo!=null) expect(allYears[i]).toBeLessThanOrEqual(yearTo)
        } 
        await this.driver.sleep(1000);
    }

    async clearRefine() {
        if ((await this.driver.findElement(this.refineCancelBtn)).isDisplayed()) {return await this.click(this.refineCancelBtn)}
    }

}