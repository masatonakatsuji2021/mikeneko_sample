"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderUI = void 0;
const Response_1 = require("Response");
const UI_1 = require("UI");
class HeaderUI extends UI_1.UI {
    static set setTitle(title) {
        this.title.text = title;
    }
    static set setBack(status) {
        if (status) {
            this.back.display = true;
        }
        else {
            this.back.display = false;
        }
    }
    handle() {
        HeaderUI.title = this.mjs.title;
        HeaderUI.back = this.mjs.back;
        this.mjs.back.onClick = () => {
            Response_1.Response.back();
        };
    }
}
exports.HeaderUI = HeaderUI;
