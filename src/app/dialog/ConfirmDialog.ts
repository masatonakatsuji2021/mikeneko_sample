import { Dialog } from "Dialog";
import { Response } from "Response";

export class ConfirmDialog extends Dialog {

    /**
     * ***open** : Opens an confirm dialog.
     * @param {string} message message
     * @param {string} nextText next button text
     * @param {string} closeText close button text
     * @param {() => void} nextHandle next button click handle
     * @param {() => void} closeHandle Close button click handle
     */
    public static open(message: string, nextText: string, closeText: string, nextHandle: () => void,  closeHandle: () => void ) : void {
        
        const context = Response.openDialog("confirm");
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