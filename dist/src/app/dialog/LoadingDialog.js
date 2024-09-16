"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingDialog = void 0;
const Dialog_1 = require("Dialog");
const Response_1 = require("Response");
class LoadingDialog extends Dialog_1.Dialog {
    static open(message) {
        const loadingDialog = Response_1.Response.openDialog("loading");
        loadingDialog.mjs.message.text = message;
        return loadingDialog;
    }
}
exports.LoadingDialog = LoadingDialog;
