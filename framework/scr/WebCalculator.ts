import * as assert        from "assert";
import {
    BrowserFactory, Config,
    Actor, BrowseTheWeb,
    Navigate, Enter, Wait, Text, See,
    Key
}                         from "thekla";
import {GoogleCalculator} from "./lib/GoogleCalculator";
import {GoogleSearch}     from "./lib/GoogleSearch";
import {Add}              from "./lib/Tasks/Add";


let castMap = new Map<string, Actor>();

export class WebCalculator{

    static create(actorName: string) {
        return new WebCalculator(actorName);
    }

    private static config: Config = {
        browserName: "chrome",
        serverUrl: "http://localhost:4444/wd/hub",
        // firefoxOptions: {
        //     binary: "C:\\PProgramme\\FirefoxPortable\\App\\Firefox\\firefox.exe",
        //     proxy: {
        //         proxyType: "direct"
        //     }
        // }
    };

    private theActor: Actor;

    constructor(private actorName: string) {
        if(castMap.has(actorName)) {
            this.theActor = <Actor>castMap.get(actorName);
            return;
        }
        this.theActor = Actor.named(actorName);
        this.theActor.whoCan(BrowseTheWeb.using(BrowserFactory.create(WebCalculator.config)));
        castMap.set(actorName, this.theActor);
    }

    async loadCalculator(): Promise<void> {
        return await this.theActor.attemptsTo(
            Navigate.to("https://www.google.de"),
            Enter.value("calculator").into(GoogleSearch.searchField),
            Enter.value(Key.ENTER).into(GoogleSearch.searchField),
            Wait.for(500),
        );
    }

    add(x: number, y: number): Promise<number> {
        return this.theActor
            .attemptsTo(
                Add.number(x).to(y),
                Wait.for(500))
            .then(() => {return 4;});
    }

    check(expected: string) {
        const matcher = (actual: string) => {assert.strictEqual(actual,expected); return};

        return this.theActor.attemptsTo(
            See.if(Text.of(GoogleCalculator.input)).fulfills(matcher)
        )
    }

    static cleanup(): Promise<void> {
        return new Promise(async (fulfill) => {
            await BrowserFactory.cleanup();
            fulfill();
        })
    }
}