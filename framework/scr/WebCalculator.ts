import {BrowserFactory, until, By, Config, Browser, Key, WebElementFinder} from "thekla";
import {Utils} from "thekla/dist/src/utils/Utils";
import {GoogleCalculator} from "./po/GoogleCalculator";
import {GoogleSearch} from "./po/GoogleSearch";


export class WebCalculator{
    private static config: Config = {
        browserName: "firefox",
        serverUrl: "http://localhost:4444/wd/hub",
        firefoxOptions: {
            binary: "C:\\PProgramme\\FirefoxPortable\\App\\Firefox\\firefox.exe",
            proxy: {
                proxyType: "direct"
            }
        }
    };

    private static browser: Browser;

    static async init() {

        if(WebCalculator.browser === undefined) {
            return new Promise(async (fulfill, reject) => {
                await BrowserFactory.create(WebCalculator.config, "wdjs")
                    .then((browser: Browser) => {
                        WebCalculator.browser = browser;
                        fulfill();
                    });
            })
        } else {
            return Promise.resolve();
        }
    }

    static add(x: number, y: number): Promise<number> {
        return new Promise(async (fulfill, reject) => {
            await WebCalculator.init();
            const b = WebCalculator.browser;
            const gc = new GoogleCalculator(b);

            await b.wait(until(() => gc.input.isVisible()));
            await Utils.wait(300);

            await gc.enterNumber(x);
            await gc.plus.click();
            await gc.enterNumber(y);
            await gc.res.click();


            // await input.sendKeys(`${x}+${y}`);
            // await result.click();
            const value = Number.parseInt(await gc.input.getText());
            fulfill(value);
        });
    }

    static loadCalculator(): Promise<void> {
        return new Promise(async (fulfill, reject) => {
            await WebCalculator.init();
            const b = WebCalculator.browser;
            const gs = new GoogleSearch(b);

            await b.get('http://www.google.com');
            await b.wait(until(() => gs.searchField.isVisible()));
            await gs.searchField.sendKeys('calculator');
            await gs.searchField.sendKeys(Key.ENTER);
            await b.wait(until(() => b.hasTitle('calculator - Google-Suche')), 1000);
            fulfill();
        });
    }

    static cleanup(): Promise<void> {
        return new Promise(async (fulfill) => {
            await BrowserFactory.cleanup();
            fulfill();
        })
    }
}