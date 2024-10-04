import { Dialog } from "Dialog";

/**
 * Confirm Dialog Class
 */
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
        
        const context = this.show("confirm");
        context.vdos.message.text = message;
        context.vdos.next.text = nextText;
        context.vdos.next.onClick = () => {
            nextHandle();
            context.close();
        };

        context.vdos.close.text = closeText;
        context.vdos.close.onClick = () => {
            closeHandle();
            context.close();
        };
    }
}