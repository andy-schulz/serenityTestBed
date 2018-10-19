import {Builder, By, until, Key, ThenableWebDriver} from "selenium-webdriver";

export class WebCalculator{
    private static driver: ThenableWebDriver = new Builder().
    usingServer('http://localhost:4444/wd/hub').
    withCapabilities({browserName: 'chrome', chromeOptions: {binary: "C:\\PProgramme\\GoogleChromePortable64\\App\\Chrome-bin\\chrome.exe"}}).
    build();


    static add(x: number, y: number): Promise<number> {
        const wd = WebCalculator.driver;
        return new Promise(async (fulfill, reject) => {
            // const input = driver.findElement(By.css("[id='cwos']"));
            await wd.wait(until.elementLocated(By.css("[id='cwtltblr']")));
            const input = await wd.findElement(By.css("[id='cwtltblr']"));
            await input.sendKeys(`${x}+${y}`);
            await wd.findElement(By.css("[aria-label='Ist gleich']")).click();
            const result = Number.parseInt(await input.getText());
            fulfill(result);
        });
    }

    static loadCalculator(): Promise<void> {
        const wd = WebCalculator.driver;

        return new Promise(async (fulfill, reject) => {
            await wd.get('http://www.google.com');
            await wd.wait(until.elementLocated(By.name('q')));
            await wd.findElement(By.name('q')).sendKeys('calculator');
            await wd.findElement(By.name('q')).sendKeys(Key.ENTER);
            // await wd.findElement(By.name('btnK')).click();
            await wd.wait(until.titleIs('calculator - Google-Suche'), 1000);
            fulfill();
        });
    }

    static cleanup(): Promise<void> {
        const wd = WebCalculator.driver;
        return new Promise(async (fulfill) => {
            await wd.quit();
            fulfill();
        })


    }

}