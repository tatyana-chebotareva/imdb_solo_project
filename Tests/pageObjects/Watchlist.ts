import { By, Key, until, WebDriver } from "selenium-webdriver";
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
}