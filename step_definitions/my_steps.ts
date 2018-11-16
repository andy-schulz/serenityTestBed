import {Config}                             from "thekla";
import {AfterAll, Given, Then, When, World} from "cucumber";
import {RestAbilityOptions}                 from "thekla/dist/screenplay/rest/abilities/UseTheRestApi";
import {I_Calculator}                       from "../framework/scr/I_StaticCalculator";
import {RestCalculator}                     from "../framework/scr/RestCalculator";
import {WebCalculator}                      from "../framework/scr/WebCalculator";


let data: CalculationData;
let calculator: I_Calculator;

class CalculationData {
    public result: number = 0;
    public x: number = 0;
    public y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

let config: Config = {
    browserName: "chrome",
    serverUrl: "http://localhost:4444/wd/hub",
    // firefoxOptions: {
    //     binary: "C:\\PProgramme\\FirefoxPortable\\App\\Firefox\\firefox.exe",
    // proxy: {
    //     proxyType: "direct"
    // }
    // }
};
let andy; // The Actor

AfterAll(async () => {
    return await WebCalculator.cleanup()
});

Given(/^(.*) is able to use a WebCalculator$/, {timeout: 60 * 1000},
    async (name: string) => {
        calculator = WebCalculator.create(name);
        await calculator.loadCalculator();
    });


Given(/^(.*) is able to use a RestCalculator$/,
    async function (name: string) {
        let opts: RestAbilityOptions = {
            restClient: "request",
        };

        if(this.parameters.proxy) {
            opts.proxy = this.parameters.proxy;
        }

        calculator = RestCalculator.create(name, opts);
        await calculator.loadCalculator();
    });

When(/^(.*) adds the numbers (.*) and (.*)$/, {timeout: 60 * 1000},
    async (name: string, x: number, y: number) => {
        data = new CalculationData(x, y);
        await calculator.add(x, y);
    });

Then(/^(.*) should get the result (.*)$/,
    async (name: string, expected: number) => {
        await calculator.check(expected.toString());
    });

