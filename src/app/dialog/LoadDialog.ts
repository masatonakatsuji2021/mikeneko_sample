import { Dialog } from "Dialog";

/**
 * Loading Icon Dialog Class
 */
export class LoadDialog extends Dialog {
    
    private static dialog;

    public static open(message?: string) {
        this.dialog = this.show();
        if (message) this.dialog.vdos.message.text = message;
        return this.dialog;
    }

    public set message(message : string) {
        this.vdos.message.text = message;
    }

}