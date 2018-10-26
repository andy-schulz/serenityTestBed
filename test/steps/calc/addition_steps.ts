import { BeforeAll, AfterAll, Given, When, Then } from "cucumber";
import * as assert from 'assert';
import {I_StaticCalculator} from "../../../framework/scr/I_StaticCalculator";
import {WebCalculator} from "../../../framework/scr/WebCalculator";
import {Calculator} from "../../../framework/scr/Calculator";



let data: CalculationData;
let calculator: I_StaticCalculator;

class CalculationData {
    public result: number = 0;
    public x: number = 0;
    public y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

AfterAll(function () {
    return calculator.cleanup();
});

Given('a WebCalculator is used', async () => {
    calculator = WebCalculator;
});

Given('a Calculator is used', async () => {
    calculator = Calculator;
});

Given('the numbers {int} and {int}',{timeout: 60 * 1000}, async (x: number, y: number) => {
    await calculator.loadCalculator();
    data = new CalculationData(x, y);
    return Promise.resolve(2);
});

When('they are added together', () => {
return new Promise(async (fulfill, reject) => {
    data.result = await calculator.add(data.x, data.y);
    fulfill();
})
});

Then('should the result be {int}', (expected: number) => {
    return new Promise(async (fulfill, reject) => {
        try {
            assert.strictEqual(data.result, expected)
        } catch (e) {
            reject({result: data.result, expected: expected})
        }
        fulfill(data.result)
    });
});