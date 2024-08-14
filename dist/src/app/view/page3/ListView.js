"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListView = void 0;
const Response_1 = require("Response");
const View_1 = require("app/view/View");
class ListView extends View_1.View {
    constructor() {
        super(...arguments);
        this.index = 0;
    }
    handle() {
        this.title = "Page3";
        this.backMode = true;
        if (Response_1.Response.isNext())
            ListView.buffers = [];
        ListView.buffers.forEach((data) => {
            this.addItem(data);
        });
        this.mjs.add.onClick = () => {
            const data = {
                index: this.index,
                name: "Item Name " + this.index,
                code: ("000" + this.index).slice(-4),
            };
            this.addItem(data);
            ListView.buffers.push(data);
            this.index++;
        };
    }
    addItem(data) {
        const item = Response_1.Response.appendUI(this.mjs.list, "listItem");
        item.mjs.name.text = data.name;
        item.mjs.code.text = data.code;
        item.mjs.link
            .data("index", data.index)
            .onClick = (_, my) => {
            Response_1.Response.next("/page3/" + my.data("index"));
        };
    }
}
exports.ListView = ListView;
ListView.buffers = [];
