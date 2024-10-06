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
    public static open(message?: string) : LoadingDialog {
        const loadingDialog = this.show("loading") as LoadingDialog;
        if (message) loadingDialog.vdos.message.text = message;
        return loadingDialog;
    }

    /** set message  */
    public set message(message: string) {
        this.vdos.message.text = message;
    }

}