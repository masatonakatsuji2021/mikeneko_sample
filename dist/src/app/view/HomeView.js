"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeView = void 0;
const Response_1 = require("Response");
const View_1 = require("app/view/View");
const LoadingDialog_1 = require("app/dialog/LoadingDialog");
/**
 * Home View Class
 * Display screen immediately after launching the app.
 */
class HomeView extends View_1.View {
    handle() {
        this.back = false;
        this.title = "Home";
        // When the page1 button is pressed.
        this.mjs.page1.onClick = () => {
            // next to Page1.
            Response_1.Response.next("/page1");
        };
        // When the page2 button is pressed.
        this.mjs.page2.onClick = () => {
            // next to Page2.
            Response_1.Response.next("/page2");
        };
        // When the page3 button is pressed.
        this.mjs.page3.onClick = () => {
            // next to Page3.
            Response_1.Response.next("/page3");
        };
        // When the page4 button is pressed.
        this.mjs.page4.onClick = () => {
            // next to Page4.
            Response_1.Response.next("/page4");
        };
        // When the page5 button is pressed.
        this.mjs.page5.onClick = () => {
            // next to Page5.
            Response_1.Response.next("/page5");
        };
        // When the page6 button is pressed.
        this.mjs.page6.onClick = () => {
            // next to Page5.
            // Lock and stop screen transition function
            Response_1.Response.lock = true;
            // Loading Dialog Open
            const load = LoadingDialog_1.LoadingDialog.open("3s wait...");
            setTimeout(() => {
                // delay 3s...
                // Loading Dialog Close.
                load.close();
                // Unlock screen transitions
                Response_1.Response.lock = false;
                // next to Page6..
                Response_1.Response.next("/page6");
            }, 3000);
        };
        // When the page7 button is pressed.
        this.mjs.page7.onClick = () => {
            // next to Page7.
            Response_1.Response.next("/page7");
        };
    }
}
exports.HomeView = HomeView;
