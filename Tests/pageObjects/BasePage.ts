import { Actions, By, Key, until, WebDriver, WebElement } from "selenium-webdriver";
import { SeleniumServer } from "selenium-webdriver/remote";

/**
 * This is a class representing a BASE PAGE, 
 * which we use for working with base page elements and common methods that can be used on ANY page
 */
export class BasePage {

  driver: WebDriver;
    url: string = "https://www.imdb.com/";
  footer: By;

  signInBtn: By = By.xpath('//div[text()="Sign In"]');
  watchlistBtn: By = By.xpath('//div[text()="Watchlist"]');
  
  searchFld: By = By.id("suggestion-search");

  allSearchOpts: By = By.xpath("//div[text()='All']");
  advancedSearch: By = By.xpath("//a[span[text()='Advanced Search']]");

  // Menu items

  mainMenu: By = By.id("imdbHeader-navDrawerOpen--desktop")

  menuMovies: Array<string> = [
    "Release Calendar", // 0
    "DVD & Blu-ray Releases", // 1
    "Top Rated Movies", // 2
    "Most Popular Movies", // 3
    "Browse Movies by Genre", // 4
    "Top Box Office", // 5
    "Showtimes & Tickets", // 6
    "In Theaters", // 7
    "Coming Soon", // 8
    "Movie News", // 9
    "India Movie Spotlight", // 10
  ]

  menuCelebs: Array<string> = [
    "Born Today", // 0
    "Most Popular Celebs", // 1
    "Celebrity News" // 2
  ]

  menuTVShows: Array<string> = [
    "What's on TV & Streaming", // 0
    "Top Rated Shows", // 1
    "Most Popular Shows", // 2
    "Browse TV Shows by Genre", // 3
    "TV News", // 4
    "India TV Spotlight" // 5
  ]  

  menuWatch: Array<string> = [
    "What to Watch", // 0
    "Latest Trailers", // 1
    "IMDb TV", // 2
    "IMDb Originals", // 3
    "IMDb Picks", // 4
    "IMDb Podcasts" // 5
  ]

  menuAwardsEvents: Array<string> = [
    "Oscars", // 0
    "Best Picture Winners", // 1
    "Golden Globes", // 2
    "Emmys", // 3
    "APA Heritage Month", // 4
    "STARmeter Awards", // 5
    "San Diego Comic-Con", // 6
    "New York Comic-Con", // 7
    "Sundance Film Festival", // 8
    "Toronto Int'l Film Festival", // 9
    "Awards Central", // 10
    "Festival Central", // 11
    "All Events" // 12
  ]

  /**
   * Create a basepage
   * @param {WebDriver} driver - the driver object the page object should interact with
   */
  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  /**
   * Clear input field and type in your input text
   * @async @function sendKeys
   * @param {By} elementBy - input field locator
   * @param {string} keys - your text
   */
  async sendKeys(elementBy: By, keys: string) {
    await this.driver.wait(until.elementLocated(elementBy));
    //await (await this.driver.findElement(elementBy)).clear(); // won't always work here
    await this.driver.findElement(elementBy).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await this.driver.findElement(elementBy).sendKeys(keys);
  };

  async addKeys(elementBy: By, keys: string) {
    await this.driver.wait(until.elementLocated(elementBy));
    await this.driver.findElement(elementBy).sendKeys(keys);
  };

  /**
   * Locate an element and click on it
   * @async @function 
   * @param {By} elementBy - locator of your element
   * @returns a promise that will be resolved when the click command has completed
   */
  async click(elementBy: By) {
    await this.driver.wait(until.elementLocated(elementBy));
    return (await this.driver.findElement(elementBy)).click();
  };

  /**
   * Locate an element and scroll to get it into view (on top of visible part)
   * @async @function scrollIntoViewBy
   * @param {By} elementBy - locator of your element
   */
  async scrollIntoViewBy (elementBy: By) {
    var element: WebElement = await this.driver.findElement(elementBy);
    await this.driver.executeScript("arguments[0].scrollIntoView();", element);
  }

  /**
   * Scroll to get an element into view (on top of visible part)
   * @async @function scrollIntoView
   * @param {WebElement} element - your element
   */
  async scrollIntoView (element: WebElement) {
    await this.driver.executeScript("arguments[0].scrollIntoView();", element);
  }

  /**
   * Scroll all the way down to the footer so target will load for us all the search results
   * @async @function scrollDown
   */
  async scrollDown() {
    var element: WebElement = await this.driver.findElement(this.footer);
    await this.driver.executeScript("arguments[0].scrollIntoView();", element);
    await this.driver.sleep(2000);
  }

  async search(term: string) {
    await this.sendKeys(this.searchFld, term);
    await this.addKeys(this.searchFld, Key.ENTER);
    await this.driver.sleep (2000);
    var firstResult: WebElement = await this.driver.findElement(By.xpath("//div[2]/table/tbody/tr[1]/td[2][@class='result_text']/a"));
    var text: string = await firstResult.getText();
    expect(text.toLowerCase()).toBe(term.toLowerCase());
  }

  async viewDefaultWatchlist() {
    return await this.click(this.watchlistBtn);
  }

  async goToAdvancedSearch(){
    await this.click(this.allSearchOpts);
    await this.click(this.advancedSearch);
    await this.driver.sleep(2000);
  }

  async goToMenuItem(menuItem: string) {
    await this.click(this.mainMenu);
    await this.driver.sleep(1000)
    await this.click(By.xpath(`(//*[@class="ipc-list-item__text"][text()="${menuItem}"])[last()]/..`))
    await this.driver.sleep(2000)
  }

}