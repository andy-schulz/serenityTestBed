export class Calculator{

    static add(x: number, y: number): Promise<number> {
        return Promise.resolve(x + y);
    }

    static loadCalculator(): Promise<void> {
        return Promise.resolve();
    }


    static cleanup(): Promise<void> {
        return Promise.resolve();
    }
}