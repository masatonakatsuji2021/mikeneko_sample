import { UI } from "UI";

export class Item3UI extends UI {

    /** set message index */
    public set index(index : number) {
        this.vdos.message.text = "Item3 Message " + index + "....";
    }
}