"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page3View = void 0;
const Response_1 = require("Response");
const View_1 = require("app/view/View");
const AlertDialog_1 = require("app/dialog/AlertDialog");
const ConfirmDialog_1 = require("app/dialog/ConfirmDialog");
const LoadingDialog_1 = require("app/dialog/LoadingDialog");
class Page3View extends View_1.View {
    handle() {
        this.title = "Page3";
        this.mjs.d1.onClick = () => {
            // open dialog (test dialog)
            const testDialog = Response_1.Response.openDialog("test");
            testDialog.mjs.close.onClick = () => {
                testDialog.close();
            };
        };
        this.mjs.d2.onClick = () => {
            // open alert dialog1
            AlertDialog_1.AlertDialog.open("Dialog Title", "description text sample \n ... OK!", "Close");
        };
        this.mjs.d3.onClick = () => {
            // open alert dialog2
            AlertDialog_1.AlertDialog.open("alert dialog2 description text sample....", "Next", () => {
                AlertDialog_1.AlertDialog.open("ok", "close", () => { });
            });
        };
        this.mjs.d4.onClick = () => {
            // open confirm dialog
            ConfirmDialog_1.ConfirmDialog.open("Confirm dialog description text sample....", "Next", "Cancel", () => {
                AlertDialog_1.AlertDialog.open("OK", "close", () => { });
            }, () => { });
        };
        this.mjs.d5.onClick = () => {
            // loading dialog...
            const ld = LoadingDialog_1.LoadingDialog.open("Loading Test...");
            setTimeout(() => {
                ld.close();
            }, 4000);
        };
    }
}
exports.Page3View = Page3View;
