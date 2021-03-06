import {Task, Activity, Click} from "thekla";
import {GoogleCalculator} from "../GoogleCalculator";
import {PerformsTask} from "thekla/dist/screenplay/Actor";

export class Add extends Task {
    private secondNumber: number;

    static number(firstNumber: number) {
        return new Add(firstNumber);
    }

    to(secondNumber: number): Activity {
        this.secondNumber = secondNumber;
        return this;
    }

    constructor(private firstNumber: number) {
        super();
        this.secondNumber = 0;
    }


    public enterNumber(number: number): Activity[] {
        const clickFlow: Activity[] = [];
        if(number < 0) {
            clickFlow.push(Click.on(GoogleCalculator.minus));
        }

        for (let char of number.toString()) {
            switch(char) {
                case '1':
                    clickFlow.push(Click.on(GoogleCalculator.one));
                    break;
                case '2':
                    clickFlow.push(Click.on(GoogleCalculator.two));
                    break;
                case '3':
                    clickFlow.push(Click.on(GoogleCalculator.three));
                    break;
                case '4':
                    clickFlow.push(Click.on(GoogleCalculator.four));
                    break;
                case '5':
                    clickFlow.push(Click.on(GoogleCalculator.five));
                    break;
                case '6':
                    clickFlow.push(Click.on(GoogleCalculator.six));
                    break;
                case '7':
                    clickFlow.push(Click.on(GoogleCalculator.seven));
                    break;
                case '8':
                    clickFlow.push(Click.on(GoogleCalculator.eight));
                    break;
                case '9':
                    clickFlow.push(Click.on(GoogleCalculator.nine));
                    break;
                case '0':
                    clickFlow.push(Click.on(GoogleCalculator.zero));
                    break;
            }
        }
        return clickFlow;
    }

    performAs(actor: PerformsTask): Promise<void> {
        return actor.attemptsTo(
            ...this.enterNumber(this.firstNumber),
            Click.on(GoogleCalculator.plus),
            ...this.enterNumber(this.secondNumber),
            Click.on(GoogleCalculator.res)
        )
    }
}