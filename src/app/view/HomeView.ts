import { View } from "app/view/View";

export class HomeView extends View {

    public handle() {
        this.title = "Mikeneko";
        this.backMode = false;
    }
}