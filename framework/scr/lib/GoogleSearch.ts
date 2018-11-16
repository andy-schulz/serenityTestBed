import {By, element, SppWebElementFinder} from "thekla";

export class GoogleSearch {
    public static searchField: SppWebElementFinder = element(By.css("[name='q'"));
}

