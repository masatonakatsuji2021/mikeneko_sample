import { Response } from "Response";
import { View } from "app/view/View";
import { Page4View } from "app/view/Page4View";

export class DetailView extends View {

    public handleAlways(id: number) {
        this.title = "Page4 (index = " + id + ")";
    }

    public handle(id: number) {

        let item;
        Page4View.stub.forEach((s_) => {
            if (s_.id != id) return;
            item = s_;
        });

        this.vdos.name.text = item.name;
        this.vdos.code.text = item.code;
        this.vdos.description.text = item.description;
         
    }
}