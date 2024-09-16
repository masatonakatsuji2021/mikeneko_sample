import { Response } from "Response";
import { View } from "app/view/View";
import { Page4View } from "app/view/Page4View";

export class DetailView extends View {

    public handle(id: number) {
        this.title = "Page4 (index = " + id + ")";

        let item;
        Page4View.stub.forEach((s_) => {
            if (s_.id != id) return;
            item = s_;
        });

        this.mjs.name.text = item.name;
        this.mjs.code.text = item.code;
        this.mjs.description.text = item.description;
         
    }
}