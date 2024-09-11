import { View } from "app/view/View";

export class HomeView extends View {

    public handle() {
        this.title = "Mikeneko";
        this.backMode = false;

        this.mjs.test.style({color: "lightblue"});
        this.mjs.test.childs.sub1.text = "Text Area Test....(sub1)";
        this.mjs.test.childs.sub2.text = "Text Area Test....(sub2)";
    }
}