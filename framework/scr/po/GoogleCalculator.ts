import {Browser, By, WebElementFinder} from "thekla";

export class GoogleCalculator {
    public input: WebElementFinder;
    public minus: WebElementFinder;
    public plus: WebElementFinder;

    public zero: WebElementFinder;
    public one: WebElementFinder;
    public two: WebElementFinder;
    public three: WebElementFinder;
    public four: WebElementFinder;
    public five: WebElementFinder;
    public six: WebElementFinder;
    public seven: WebElementFinder;
    public eight: WebElementFinder;
    public nine: WebElementFinder;

    public res: WebElementFinder;


    constructor(browser: Browser) {
        this.input = browser.element(By.css("[id='cwtltblr']"));

        this.minus = browser.element(By.css("#cwbt36"));
        this.plus = browser.element(By.css("#cwbt46"));

        this. zero = browser.element(By.css("#cwbt43"));
        this.one = browser.element(By.css("#cwbt33"));
        this.two = browser.element(By.css("#cwbt34"));
        this.three = browser.element(By.css("#cwbt35"));
        this.four = browser.element(By.css("#cwbt23"));
        this.five = browser.element(By.css("#cwbt24"));
        this.six = browser.element(By.css("#cwbt25"));
        this.seven = browser.element(By.css("#cwbt13"));
        this.eight = browser.element(By.css("#cwbt14"));
        this.nine = browser.element(By.css("#cwbt15"));

        this.res = browser.element(By.css("#cwbt45"));
    }

    public enterNumber = async (number: number): Promise<void> => {
        if(number < 0) {
            this.minus.click();
        }

        for (let char of number.toString()) {
            switch(char) {
                case '1':
                    await this.one.click();
                    break;
                case '2':
                    await this.two.click();
                    break;
                case '3':
                    await this.three.click();
                    break;
                case '4':
                    await this.four.click();
                    break;
                case '5':
                    await this.five.click();
                    break;
                case '6':
                    await this.six.click();
                    break;
                case '7':
                    await this.seven.click();
                    break;
                case '8':
                    await this.eight.click();
                    break;
                case '9':
                    await this.nine.click();
                    break;
                case '0':
                    await this.zero.click();
                    break;
            }
        }
        return Promise.resolve();

    };
}