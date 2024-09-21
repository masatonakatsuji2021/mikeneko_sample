"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeView = void 0;
const Response_1 = require("Response");
const View_1 = require("app/view/View");
const LoadingDialog_1 = require("app/dialog/LoadingDialog");
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
        this.mjs.page5.onClick = () => {
            // next to Page5.
            Response_1.Response.next("/page5");
        };
        this.mjs.page6.onClick = () => {
            // next to Page5.
            Response_1.Response.lock = true;
            const load = LoadingDialog_1.LoadingDialog.open("3s wait...");
            setTimeout(() => {
                load.close();
                Response_1.Response.lock = false;
                Response_1.Response.next("/page6");
            }, 3000);
        };
    }
}
exports.HomeView = HomeView;
