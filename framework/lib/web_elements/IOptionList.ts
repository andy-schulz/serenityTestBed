export interface IOptionList {
    selectElementContainingText(searchString: string): Promise<void>;
    selectElementByIndex(index: number): Promise<void>;
}