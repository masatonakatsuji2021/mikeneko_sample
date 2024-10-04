"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page1View = void 0;
const Response_1 = require("Response");
const View_1 = require("app/view/View");
/**
 * Page1 View Class
 */
class Page1View extends View_1.View {
    handle() {
        this.title = "Page1";
        // When you press the next button
        this.vdos.btn.childs.next.onClick = () => {
            // move to type1
            Response_1.Response.next("/page1/type1");
        };
        // When you press the replace button
        this.vdos.btn.childs.replace.onClick = () => {
            // move to type1 (replace)
            Response_1.Response.replace("/page1/type1");
        };
    }
}
exports.Page1View = Page1View;
