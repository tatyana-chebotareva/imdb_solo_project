import { Actions, By, Key, until, WebDriver, WebElement } from "selenium-webdriver";
import { createSolutionBuilderWithWatch } from "typescript";
import { BasePage } from "./BasePage";

/**
 * This is a class representing Advanced search page
 */
export class AdvancedSearch extends BasePage{

    driver: WebDriver;

    advancedTitleSearch: By = By.xpath("//a[text()='Advanced Title Search']");
    advancedNameSearch: By = By.xpath("//a[text()='Advanced Name Search']");
    featureFilm: By = By.xpath("//label[text()='Feature Film']");
    startDate: By = By.name("release_date-min")
    endDate: By = By.name("release_date-max")
    ratingMin: By = By.name("user_rating-min")
    votesMin: By = By.name("num_votes-min")
    advSearchBtn: By = By.xpath('//*[@type="submit"][text()="Search"]')

    genresToSearch: Array<string> = [
    "Action", // 0
    "Adventure", // 1
    "Animation", // 2
    "Biography", // 3
    "Comedy", // 4
    "Crime", // 5
    "Documentary", // 6
    "Drama", // 7
    "Family", // 8
    "Fantasy", // 9
    "Film-Noir", // 10
    "Game-Show", // 11
    "History", // 12
    "Horror", // 13
    "Music", // 14
    "Musical", // 15
    "Mystery", // 16
    "News", // 17
    "Reality-TV", // 18
    "Romance", // 19
    "Sci-Fi", // 20
    "Sport", // 21
    "Talk-Show", // 22
    "Thriller", // 23
    "War", // 24
    "Western" // 25
]

    advSText: By = By.xpath('//div[@id="main"]/p[1]');

    advTSHeader: By = By.xpath("//h1[text()='Advanced Title Search']");
    advTSTextValue = "Remember, all the fields below are optional (though you should fill out at least one so there's something to search for). Please note that when you're given the option of a range (two date boxes for release date, or two boxes for min/max number of votes), you do not need to fill out both boxes. Filling out the 'min' box will give you results of things larger/after; filling out the 'max' box will give you results of things smaller/before."
    
    advNSHeader: By = By.xpath("//h1[text()='Advanced Name Search']");
    advNSTextValue = "Remember, all the fields below are optional (though you should fill out at least one so there's something to search for). Please note that when you're given the option of a range (two date boxes for date of birth/date of death), you do not need to fill out both boxes. Filling out the 'min' box will give you results of people older; filling out the 'max' box will give you results of people younger."

    resultsHeader: By = By.css('h1.header');
    totalRes: By = By.xpath('//div[@class="desc"]/span')

    moviesYear: By = By.className("lister-item-year");
    moviesGenres: By = By.className("genre");

    nameToSearch: By = By.css('[name="name"]')
    startBirthDate: By = By.css('[name="birth_date-min"]')
    endBirthDate: By = By.css('[name="birth_date-max"]')

    names: By = By.xpath('//h3[@class="lister-item-header"]/a')

    /**
     * Create a basepage
     * @param {WebDriver} driver - the driver object the page object should interact with
     */
    constructor(driver: WebDriver) {
        super(driver);
    }

    async search(term: string) {
        await this.sendKeys(this.searchFld, term);
        await this.addKeys(this.searchFld, Key.ENTER);
        await this.driver.sleep (2000);
        var firstResult: WebElement = await this.driver.findElement(By.xpath("//div[2]/table/tbody/tr[1]/td[2][@class='result_text']/a"));
        var text: string = await firstResult.getText();
        expect(text.toLowerCase()).toBe(term.toLowerCase());
    }

    async checkPageIsLoaded() {
        await (await this.driver.findElement(this.advancedTitleSearch)).isDisplayed();
        await (await this.driver.findElement(this.advancedNameSearch)).isDisplayed();
    }

    async advTitleSearch(startDate: number, endDate: number, minRating : number, minVotes: number, genresInd: Array <number>){
        await this.click(this.advancedTitleSearch);
        await this.checkAdvTitleSPageIsLoaded();
        await this.click(this.featureFilm)
        await this.sendKeys(this.startDate, `${startDate}`);
        await this.sendKeys(this.endDate, `${endDate}`);
        await this.sendKeys(this.ratingMin, `${minRating}`)
        await this.click(this.votesMin);
        await this.sendKeys(this.votesMin,`${minVotes}`);
        for (var genre of genresInd) {
            await this.click(By.xpath(`//label[text()="${this.genresToSearch[genre]}"]`));
        }
        await this.click(this.advSearchBtn);
        await this.driver.sleep (2000);
    }

    async checkAdvTitleSPageIsLoaded() {
        await (await this.driver.findElement(this.advTSHeader)).isDisplayed();
        await (await this.driver.findElement(this.advSText)).isDisplayed();
        expect(await (await this.driver.findElement(this.advSText)).getText()).toBe(this.advTSTextValue);
        await (await this.driver.findElement(this.advSearchBtn)).isDisplayed();
    }

    async checkATSResultsPageIsLoaded() {
        await (await this.driver.findElement(this.resultsHeader)).isDisplayed();
    }

    async checkATSResults(startDate: number, endDate: number, minVotes: number, genresInd: Array <number>) {
        expect((await (await this.driver.findElement(this.totalRes)).getText()).toLowerCase()).toContain("titles")
        if (startDate!=null) {
            expect((await (await this.driver.findElement(this.resultsHeader)).getText()).toLowerCase()).toContain(`between ${startDate}`)
            var elements = await this.driver.findElements(this.moviesYear);
            var years = await Promise.all(elements.map(async (webElm)=> {
                var year: number =+ (await webElm.getText()).replace(/\D/g, '');
                return year;
            }))
            for (let year of years) {
                expect(year).toBeGreaterThanOrEqual(startDate)
            } 
        }
        if (endDate!=null) {
            expect((await (await this.driver.findElement(this.resultsHeader)).getText()).toLowerCase()).toContain(`and ${endDate}`)
            var elements = await this.driver.findElements(this.moviesYear);
            var years = await Promise.all(elements.map(async (webElm)=> {
                var year: number =+ (await webElm.getText()).replace(/\D/g, '');
                return year;
            }))
            for (let year of years) {
                expect(year).toBeLessThanOrEqual(endDate)
            } 
        }
        if (genresInd.length!=0) {
            for (let genreInd of genresInd) {
                expect((await (await this.driver.findElement(this.resultsHeader)).getText()).toLowerCase()).toContain(`${this.genresToSearch[genreInd].toLowerCase()}`)
                var elements = await this.driver.findElements(this.moviesGenres);
                var allGenres = await Promise.all(elements.map(async (webElm)=> {
                    var movieGenres: string = (await webElm.getText()).toLowerCase();
                    return movieGenres;
                }))
                for (let genre of allGenres) {
                    expect(genre).toContain(this.genresToSearch[genreInd].toLowerCase())
                } 
            }
        }
    }

    async advNameSearch (name: string, startBirthDate: number, endBirthDate:number) {
        await this.click(this.advancedNameSearch);
        await this.checkAdvNameSPageIsLoaded();
        await this.sendKeys(this.nameToSearch,name)
        await this.sendKeys(this.startBirthDate, `${startBirthDate}`);
        await this.sendKeys(this.endBirthDate, `${endBirthDate}`);
        await this.click(this.advSearchBtn);
        await this.driver.sleep (2000);
    }

    async checkAdvNameSPageIsLoaded() {
        await (await this.driver.findElement(this.advNSHeader)).isDisplayed();
        await (await this.driver.findElement(this.advSText)).isDisplayed();
        expect(await (await this.driver.findElement(this.advSText)).getText()).toBe(this.advNSTextValue);
        await (await this.driver.findElement(this.advSearchBtn)).isDisplayed();
    }

    async checkANSResultsPageIsLoaded() {
        await (await this.driver.findElement(this.resultsHeader)).isDisplayed();
    }

    async checkANSResults(name: string, startBirthDate: number, endBirthDate:number) {
        expect((await (await this.driver.findElement(this.totalRes)).getText()).toLowerCase()).toContain("names")
        if (name!=null) {
            expect((await (await this.driver.findElement(this.resultsHeader)).getText()).toLowerCase()).toContain(`Name Matching "${name}"`.toLowerCase())
            var elements = await this.driver.findElements(this.names);
            var namesRes = await Promise.all(elements.map(async (webElm)=> {
                var name: string = await webElm.getText();
                return name;
            }))
            for (let nameRes of namesRes) {
                expect(nameRes).toContain(name)
            } 
        }
        if (startBirthDate!=null) expect((await (await this.driver.findElement(this.resultsHeader)).getText()).toLowerCase()).toContain(`between ${startBirthDate}`)
        if (endBirthDate!=null) expect((await (await this.driver.findElement(this.resultsHeader)).getText()).toLowerCase()).toContain(`and ${endBirthDate}`)
    }
}