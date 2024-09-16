import { Response } from "Response";
import { View } from "app/view/View";

export class Page4View extends View {

    public handle() {
        this.title = "Page4";

        Page4View.stub.forEach((s_) => {
            const item = Response.appendUI(this.mjs.list, "page4item");
            item.mjs.name.text = s_.name;
            item.mjs.code.text = s_.code;
            item.mjs.link.datas.id = s_.id;
            item.mjs.link.onClick = (_, my) => {
                Response.next("/page4/" + my.datas.id);
            };
        });
    }

    public static stub = [
        {
            id: 0,
            name: "Item Name 00",
            code: "00000",
            description: "item 00 description text sample....",
        },
        {
            id: 1,
            name: "Item Name 01",
            code: "00001",
            description: "item 01 description text sample....",
        },
        {
            id: 2,
            name: "Item Name 02",
            code: "00002",
            description: "item 02 description text sample....",
        },
        {
            id: 3,
            name: "Item Name 03",
            code: "00003",
            description: "item 03 description text sample....",
        },
        {
            id: 4,
            name: "Item Name 04",
            code: "00004",
            description: "item 04 description text sample....",
        },
    ];
}