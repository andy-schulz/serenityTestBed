export interface I_StaticCalculator {
    add(x: number, y: number): Promise<number>;
    loadCalculator(): Promise<void>;
    cleanup(): Promise<void>
}