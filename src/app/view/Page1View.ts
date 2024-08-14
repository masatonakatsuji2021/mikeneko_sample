import { View } from "app/view/View";

export class Page1View extends View {

    public handle() {
        this.title = "Page1";
        this.backMode = true;
    }
}