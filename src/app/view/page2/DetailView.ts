import { View } from "app/view/View";

export class DetailView extends View {

    public handleAlways(id : number) {
        this.title = "Page2(ID = " + id + ")";
    }
}