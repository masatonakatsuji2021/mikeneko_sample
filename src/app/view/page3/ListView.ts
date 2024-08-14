import { Response } from "Response";
import { View } from "app/view/View";

export class ListView extends View {

    public index : number = 0;

    private static buffers = [];

    public handle() {
        this.title = "Page3";
        this.backMode = true;

        if (Response.isNext()) ListView.buffers = [];

        ListView.buffers.forEach((data) => {
            this.addItem(data);
        });

        this.mjs.add.onClick = () => {
            const data = {
                index: this.index,
                name : "Item Name " + this.index,
                code : ("000" + this.index).slice(-4),
            };
            this.addItem(data);
            ListView.buffers.push(data);
            this.index++;
        };
    }

    private addItem(data) {
        const item = Response.appendUI(this.mjs.list, "listItem");
        item.mjs.name.text = data.name;
        item.mjs.code.text = data.code;
        item.mjs.link
            .data("index", data.index)
            .onClick = (_, my) => {
                Response.next("/page3/" + my.data("index"));
            }
        ;
    }
}