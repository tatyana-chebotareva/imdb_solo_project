import { By, Key, WebDriver } from "selenium-webdriver";
import { BasePage } from "./BasePage";

export class MoviePage extends BasePage{


    constructor(driver: WebDriver) {
        super(driver);
    }

    rateThisBtn: By = By.className("star-rating-button");
    yourRate: By = By.className("star-rating-value");
    deleteRatingBtn: By = By.className("star-rating-delete");
    noRate: By = By.className("star-rating-text");
    wlRibbon: By = By.className("wl-ribbon");
    watchListCounter: By = By.className("imdb-header__watchlist-button-count")

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

    async addToWatchlist () {
        var initialCount: number =+ await (await this.driver.findElement(this.watchListCounter)).getText();
        await this.click(this.wlRibbon);
        await this.driver.navigate().refresh();
        await this.driver.sleep(3000);
        var updatedCount: number =+ await (await this.driver.findElement(this.watchListCounter)).getText();
        expect(updatedCount).toBeGreaterThan(initialCount);
        expect(await (await this.driver.findElement(this.wlRibbon)).getAttribute("class")).toContain("inWL");
        expect(await (await this.driver.findElement(this.wlRibbon)).getAttribute("title")).toContain("Click to remove from watchlist");
        return;
    }

    async removeFromWatchlist () {
        var initialCount: number =+ await (await this.driver.findElement(this.watchListCounter)).getText();
        await this.click(this.wlRibbon);
        await this.driver.sleep(1000);
        await this.driver.navigate().refresh();
        await this.driver.sleep(3000);
        var updatedCount: number =+ await (await this.driver.findElement(this.watchListCounter)).getText();
        expect(initialCount).toBeGreaterThan(updatedCount);
        expect(await (await this.driver.findElement(this.wlRibbon)).getAttribute("class")).toContain("not-inWL");
        expect(await (await this.driver.findElement(this.wlRibbon)).getAttribute("title")).toContain("Click to add to watchlist");
        return;
    }

    
}