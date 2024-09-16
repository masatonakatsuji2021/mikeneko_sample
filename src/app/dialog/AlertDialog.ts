import { Dialog } from "Dialog";
import { Response } from "Response";

export class AlertDialog extends Dialog {

    /**
     * ***open** : Opens an alert dialog.
     * @param {string} message message
     * @param {string} closeText close button text
     * @param {() => void} closeHandle Close button click handle
     */
    public static open(message: string, closeText: string, closeHandle: () => void ) : void;

    /**
     * ***open** : Opens an alert dialog.
     * @param {string} title title
     * @param {string} message message
     * @param {string} closeText close button text
     * @param {() => void} closeHandle Close button click handle
     */
    public static open(title: string, message: string, closeText: string) : void;
    /**
     * ***open** : Opens an alert dialog.
     * @param {string} title title
     * @param {string} message message
     * @param {string} closeText close button text
     * @param {() => void} closeHandle Close button click handle
     */
    public static open(title: string, message: string, closeText: string, closeHandle: () => void ) : void;

    public static open(arg1, arg2, arg3, arg4?) {
        let title : string;
        let message : string;
        let closeText : string;
        let closeHandle : () => void;

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

        const context = Response.openDialog("alert");
        context.mjs.title.display = false;
        if (title) {
            context.mjs.title.display = true;
            context.mjs.title.text = title;
        }

        context.mjs.message.text = message;

        context.mjs.close.text = closeText;
        context.mjs.close.onClick = () => {
            if (closeHandle) closeHandle();
            context.close();
        };
    }
}