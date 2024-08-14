"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page2View = void 0;
const Response_1 = require("Response");
const View_1 = require("app/view/View");
const Test1Dialog_1 = require("app/dialog/Test1Dialog");
class Page2View extends View_1.View {
    handle() {
        this.title = "Page2";
        this.backMode = true;
        this.mjs.dialog1.onClick = () => {
            const dialog = Response_1.Response.openDialogOrigin("<div class=\"m10\">Dialog1 OK....</div>");
            setTimeout(() => {
                dialog.close();
            }, 4000);
        };
        this.mjs.dialog2.onClick = () => {
            Test1Dialog_1.Test1Dialog.open("Dialog Message 1 .... ok");
        };
        this.mjs.dialog2a.onClick = () => {
            Test1Dialog_1.Test1Dialog.open("Title Test", "Dialog Message 2 .... ok");
        };
        this.mjs.dialog3.onClick = () => {
            const dialog = Response_1.Response.openDialog("loading");
            setTimeout(() => {
                dialog.close();
            }, 4000);
        };
    }
}
exports.Page2View = Page2View;
