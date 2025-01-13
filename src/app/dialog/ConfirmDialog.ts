import { Dialog, Response } from "Core";

export interface IConfirmDialogOption {

    title? : string,

    message: string,

    onNextText? : string,

    onNext: () => void,

    onCancelText?: string,

    onCancel?: () => void,
}

/**
 * Confirm Dialog Class
 */
export class ConfirmDialog extends Dialog {

    public static open(option : IConfirmDialogOption) {
        const dialog = this.show();

        dialog.vdos.message.text = option.message;
        if (option.title) dialog.vdos.title.text = option.title;
        if (option.onNextText) dialog.vdos.next.text = option.onNextText;
        if (option.onCancelText) dialog.vdos.cancel.text = option.onCancelText;

        dialog.vdos.next.onClick = () => {
            dialog.close();
            if (option.onNext) option.onNext();
        };

        dialog.vdos.cancel.onClick = () => {
            dialog.close();
            if (option.onCancel) option.onCancel();
        };
    }
}