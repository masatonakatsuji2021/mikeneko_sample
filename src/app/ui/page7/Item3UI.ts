import { UI } from "UI";

export class Item3UI extends UI {

    public set index(index : number) {
        this.mjs.message.text = "Item3 Message " + index + "....";
    }
}