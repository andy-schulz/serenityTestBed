import {Browser, By, WebElementFinder} from "thekla";

export class GoogleSearch {
    public searchField: WebElementFinder;

    constructor(private browser: Browser) {
         this.searchField = browser.element(By.css("[name='q'"));
    }
}