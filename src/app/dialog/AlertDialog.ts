import { Response, Dialog } from "Core";

export interface IAlertDialogOption {

    title? : string,

    message: string,

    onCloseText?: string,

    onClose?: () => void,
}

/**
 * Alert Dialog Class
 */
export class AlertDialog extends Dialog {

    public static open(option : IAlertDialogOption) {
        const dialog = this.show();

        dialog.vdos.message.text = option.message;
        if (option.title) dialog.vdos.title.text = option.title;
        if (option.onCloseText) dialog.vdos.close.text = option.onCloseText;

        dialog.vdos.close.onClick = () => {
            dialog.close();
            if (option.onClose) option.onClose();
        };
    }
}