export interface IElement {
    click(): Promise<void>;
    sendKey(): Promise<void>;
}