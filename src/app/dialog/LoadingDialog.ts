import { Dialog } from "Dialog";
import { Response } from "Response";

export class LoadingDialog extends Dialog {
    
    public static open(message: string) : LoadingDialog {
        const loadingDialog = Response.openDialog("loading");
        loadingDialog.mjs.message.text = message;
        return loadingDialog;
    }

}