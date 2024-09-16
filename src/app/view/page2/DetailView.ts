import { View } from "app/view/View";

export class DetailView extends View {

    public handle(id : number) {
        this.title = "Page2(ID = " + id + ")";
        
    }
}