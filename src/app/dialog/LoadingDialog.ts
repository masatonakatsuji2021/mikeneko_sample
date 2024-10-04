import { Dialog } from "Dialog";

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
        const loadingDialog = this.show("loading");
        loadingDialog.vdos.message.text = message;
        return loadingDialog;
    }

}