"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertDialog = void 0;
const Dialog_1 = require("Dialog");
const Response_1 = require("Response");
class AlertDialog extends Dialog_1.Dialog {
    static open(arg1, arg2, arg3, arg4) {
        let title;
        let message;
        let closeText;
        let closeHandle;
        if (arg4 != undefined) {
            title = arg1;
            message = arg2;
            closeText = arg3;
            closeHandle = arg4;
        }
        else {
            if (typeof arg3 == "string") {
                title = arg1;
                message = arg2;
                closeText = arg3;
            }
            else {
                message = arg1;
                closeText = arg2;
                closeHandle = arg3;
            }
        }
        const context = Response_1.Response.openDialog("alert");
        context.mjs.title.display = false;
        if (title) {
            context.mjs.title.display = true;
            context.mjs.title.text = title;
        }
        context.mjs.message.text = message;
        context.mjs.close.text = closeText;
        context.mjs.close.onClick = () => {
            if (closeHandle)
                closeHandle();
            context.close();
        };
    }
}
exports.AlertDialog = AlertDialog;
