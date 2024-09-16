"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page2View = void 0;
const Response_1 = require("Response");
const View_1 = require("app/view/View");
class Page2View extends View_1.View {
    handle() {
        this.title = "Page2";
        this.mjs.description.text = "Description Text Text Text...";
        // item (first)
        const first = this.mjs.item.first;
        first.text += "(First)";
        first.style({ color: "pink" });
        // item (last)
        const last = this.mjs.item.last;
        last.text += "(Last)";
        last.style({ color: "lightgreen" });
        // item (index = 2)
        const id3 = this.mjs.item.index(2);
        id3.text += "(target)";
        id3.style({ color: "yellow" });
        // button1
        const button1 = this.mjs.button1;
        button1.datas.alertMessage = "Alert Message Test Sample ....";
        button1.onClick = (_, my) => {
            setTimeout(() => {
                alert(my.datas.alertMessage);
            }, 200);
        };
        // link 
        this.mjs.link1.onClick = () => {
            Response_1.Response.next("/page2/1");
        };
        this.mjs.link2.onClick = () => {
            Response_1.Response.next("/page2/2");
        };
        this.mjs.link3.onClick = () => {
            Response_1.Response.next("/page2/3");
        };
    }
}
exports.Page2View = Page2View;
