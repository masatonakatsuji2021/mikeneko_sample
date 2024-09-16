"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmDialog = void 0;
const Dialog_1 = require("Dialog");
const Response_1 = require("Response");
class ConfirmDialog extends Dialog_1.Dialog {
    /**
     * ***open** : Opens an confirm dialog.
     * @param {string} message message
     * @param {string} nextText next button text
     * @param {string} closeText close button text
     * @param {() => void} nextHandle next button click handle
     * @param {() => void} closeHandle Close button click handle
     */
    static open(message, nextText, closeText, nextHandle, closeHandle) {
        const context = Response_1.Response.openDialog("confirm");
        context.mjs.message.text = message;
        context.mjs.next.text = nextText;
        context.mjs.next.onClick = () => {
            nextHandle();
            context.close();
        };
        context.mjs.close.text = closeText;
        context.mjs.close.onClick = () => {
            closeHandle();
            context.close();
        };
    }
}
exports.ConfirmDialog = ConfirmDialog;
