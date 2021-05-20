import { Actions, By, Key, until, WebDriver, WebElement } from "selenium-webdriver";

/**
 * This is a class representing a BASE PAGE, 
 * which we use for working with base page elements and common methods that can be used on ANY page
 */
export class BasePage {

  driver: WebDriver;
    url: string = "https://www.imdb.com/";
  footer: By;

  signInBtn: By = By.xpath('//div[text()="Sign In"]');
  
  searchFld: By = By.id("suggestion-search");

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

}