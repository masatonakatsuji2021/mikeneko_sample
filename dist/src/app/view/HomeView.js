"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeView = void 0;
const Response_1 = require("Response");
const View_1 = require("app/view/View");
class HomeView extends View_1.View {
    handle() {
        this.back = false;
        this.title = "Home";
        this.mjs.page1.onClick = () => {
            // next to Page1.
            Response_1.Response.next("/page1");
        };
        this.mjs.page2.onClick = () => {
            // next to Page2.
            Response_1.Response.next("/page2");
        };
        this.mjs.page3.onClick = () => {
            // next to Page3.
            Response_1.Response.next("/page3");
        };
        this.mjs.page4.onClick = () => {
            // next to Page4.
            Response_1.Response.next("/page4");
        };
    }
}
exports.HomeView = HomeView;
