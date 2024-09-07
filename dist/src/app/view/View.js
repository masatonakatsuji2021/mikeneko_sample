"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const View_1 = require("View");
const Response_1 = require("Response");
class View extends View_1.View {
    constructor() {
        super(...arguments);
        this.template = "default";
        this.head = "head";
        this.header = "header";
    }
    set title(title) {
        this.mjs.headerTitle.text = title;
    }
    set backMode(status) {
        /*
        if (status) {
            this.mjs.headerBackBtn.style({display: null});
        }
        else {
            this.mjs.headerBackBtn.style({display: "none"});
        }*/
    }
    handleHeaderChanged() {
        this.mjs.headerBackBtn.onClick = () => {
            Response_1.Response.back();
        };
    }
}
exports.View = View;
