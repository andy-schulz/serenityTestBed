export interface I_StaticCalculator {
    create(): I_Calculator;
    cleanup(): Promise<void>;
}
export interface I_Calculator {
    check(result: string): Promise<void>;
    add(x: number, y: number): Promise<number>;
    loadCalculator(): Promise<void>;
}