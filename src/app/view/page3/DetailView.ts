import { View } from "app/view/View";

export class DetailView extends View {

    public handle(index : number) {
        this.title = "Page3";
        this.backMode = true;

        this.mjs.index.text = index;        
    }
}