import * as assert                         from "assert";
import {Actor, See, Response}              from "thekla";
import {RestAbilityOptions, UseTheRestApi} from "thekla/dist/screenplay/rest/abilities/UseTheRestApi";
import {SppRequest}                        from "thekla/dist/screenplay/rest/interfaces/requests";

let castMap = new Map<string, Actor>();

export class RestCalculator{
    private readonly theActor: Actor;

    private x = 0;
    private y = 0;

    static create(actorName: string, parameter: RestAbilityOptions) {
        return new RestCalculator(actorName, parameter);
    }

    constructor(private actorName: string, parameter: RestAbilityOptions) {
        if(castMap.has(actorName)) {
            this.theActor = <Actor>castMap.get(actorName);
            return;
        }

        this.theActor = Actor.named(actorName);
        this.theActor.whoCan(UseTheRestApi.using(parameter));
        castMap.set(actorName, this.theActor);
    }

    add(x: number, y: number): Promise<number> {
        this.x = x;
        this.y = y;
        return Promise.resolve(0);
    }

    loadCalculator(): Promise<void> {
        return Promise.resolve();
    }

    async check(expected: string): Promise<void> {
        const matcher = (actual: SppRequest) => {assert.strictEqual(actual.toString(),expected); return};

        return await this.theActor.attemptsTo(
            See.if(Response.to(`http://api.mathjs.org/v4/?expr=${this.x}%2B${this.y}`)).fulfills(matcher),
        );
    }

    static cleanup(): Promise<void> {
        return Promise.resolve();
    }
}