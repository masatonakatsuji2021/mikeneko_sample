import { UI } from "UI";
import { Response } from "Response";
import { View } from "app/view/View";
import { RURL } from "app/config/Routes";

export class Page4View extends View {

    public handleAlways() {
        this.title = "Page4";
    }

    public handle() {

        Page4View.stub.forEach((s_) => {
            // loop stub lists

            // append list item.
            const item = UI.append(this.mjs.list, "page4item");

            // set name
            item.mjs.name.text = s_.name;

            // set code
            item.mjs.code.text = s_.code;

            // link data set
            item.mjs.link.datas.id = s_.id;

            // link button click eventhandle.
            item.mjs.link.onClick = (_, my) => {
                Response.next(RURL.Page4.getDetail(my.datas.id));
            };
        });
    }

    // item list stub
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