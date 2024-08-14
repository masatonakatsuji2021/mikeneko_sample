"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test1Dialog = void 0;
const Dialog_1 = require("Dialog");
const Response_1 = require("Response");
class Test1Dialog extends Dialog_1.Dialog {
    static open(arg1, arg2) {
        let message, title;
        if (arg2) {
            title = arg1;
            message = arg2;
        }
        else {
            message = arg1;
        }
        Response_1.Response.openDialog("test1", {
            sendData: {
                message: message,
                title: title,
            },
        });
    }
    handle(sendData) {
        this.mjs.title.style({ display: "none" });
        this.mjs.message.text = sendData.message;
        if (sendData.title) {
            this.mjs.title.style({ display: null });
            this.mjs.title.text = sendData.title;
        }
        this.mjs.close.onClick = () => {
            // close button click....
            this.close();
        };
    }
}
exports.Test1Dialog = Test1Dialog;
