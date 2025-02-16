import { Dialog, Lib, Response, Transition } from "Core";
import { AlertDialog } from "app/dialog/AlertDialog";
import { ConfirmDialog } from "app/dialog/ConfirmDialog";
import { LoadDialog } from "app/dialog/LoadDialog";
import { HeaderUI } from "app/ui/HeaderUI";
import { View } from "app/view/View";

export class DialogView extends View {

    public handle() {
        HeaderUI
            .visible(true)
            .back(true)
            .title("Dialog View")
        ;

        this.vdos.d01.onClick = () => {
            Response.lock = true;
            const test = Dialog.show("test");
            test.vdos.close.onClick = () => {
                Response.lock = false;
//                test.close();
                Transition.back();
            }
        };

        this.vdos.d02.onClick = () => {
            Response.lock = true;
            AlertDialog.open({
                message: "Alert Dialog Message....OK",
                onClose: () => {
                    Response.lock = false;
                },
            });
        };

        this.vdos.d03.onClick = () => {
            Response.lock = true;
            AlertDialog.open({
                title: "Alert Dialog Title",
                message: "Alert Dialog Message....OK",
                onCloseText: "Exit",
                onClose: () => {
                    Response.lock = false;
                    console.log("Alert Dialog Close... OK");
                },
            });
        };

        
        this.vdos.d04.onClick = () => {
            Response.lock = true;
            ConfirmDialog.open({
                message: "Confirm Dialog ........ OK",
                onNextText: "OK",
                onCancelText: "Cancel",
                onNext: () => {
                    console.log("....OK");
                    Response.lock = false;
                },
                onCancel: () => {
                    console.log("....Cancel");
                    Response.lock = false;
                },
            });
        };

        this.vdos.d05.onClick = async () => {
            Response.lock = true;
            const load = LoadDialog.open("dialog wait (1/3)");
            
            await Lib.sleep(1000);

            load.message = "dialog wait (2/3)";

            await Lib.sleep(1000);

            load.message = "dialog wait (3/3)";

            await Lib.sleep(1000);

            load.close();
            Response.lock = false;
        };

        this.vdos.d06.onClick = () => {
            Response.lock = true;
            const d1 = Dialog.show({
                html: "<div class=\"m\"><p>Dialog1</p><div style=\"text-align:right\"><a v=\"button\">Next</a></div></div>",
            });
            d1.vdos.button.onClick = () => {
                const d2 = Dialog.show({
                    html: "<div class=\"m\"><p>Dialog2 ... OK!</p><div style=\"text-align:right\"><a v=\"button\">Close</a></div></div>",
                });
                d2.vdos.button.onClick = () => {
                    d2.close();
                    d1.close();
                    Response.lock = false;
                };
            };
        };

    }
}