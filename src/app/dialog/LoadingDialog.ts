import { Dialog } from "Dialog";
import { Response } from "Response";

/**
 * Loading Icon Dialog Class
 */
export class LoadingDialog extends Dialog {
    
    /**
     * ***open** : Opens an loading Icon dialog.
     * @param message 
     * @returns 
     */
    public static open(message: string) : LoadingDialog {
        const loadingDialog = Response.openDialog("loading");
        loadingDialog.mjs.message.text = message;
        return loadingDialog;
    }

}