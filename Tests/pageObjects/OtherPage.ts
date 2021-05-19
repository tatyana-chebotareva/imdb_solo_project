import { By, Key, WebDriver } from "selenium-webdriver";
import { BasePage } from "./BasePage";

export class OtherPage extends BasePage{

    constructor(driver: WebDriver) {
        super(driver);
    }

}