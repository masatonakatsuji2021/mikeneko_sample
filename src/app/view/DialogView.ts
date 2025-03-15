import { Dialog } from "Dialog";
import { AlertDialog } from "AlertDialog";
import { ConfirmDialog } from "ConfirmDialog";
import { LoadingDialog } from "LoadingDialog";
import { Lib } from "Lib";
import { Transition } from "Transition";
import { HeaderUI } from "app/ui/HeaderUI";
import { View } from "./View";
import { BottomupDialog } from "BottomupDialog";

/**
 * ### DialogView
 * [renderin HTML](../../rendering/view/dialog.html)
 */
export class DialogView extends View {

    public handle() {

        HeaderUI
            .visible(true)
            .back(true)
            .title("Dialog View")
        ;

        this.vdos.d01.onClick = () => {
            const test = Dialog.show("test");
            test.vdos.close.onClick = () => {
                Transition.back();
            }
        };

        this.vdos.d02.onClick = () => {
            Transition.lock = true;
            AlertDialog.open({
                message: "Alert Dialog Message....OK\nText Sample Text Sample Text Sample ....",
                transitionLock: true,
            });
        };

        this.vdos.d03.onClick = () => {
            AlertDialog.open({
                transitionLock: true,
                title: "Alert Dialog Title",
                message: "Alert Dialog Message....OK\nText Sample Text Sample Text Sample ....",
                buttonText: "Exit",
                onButtonClick: () => {
                    console.log("Alert Dialog Close... OK");
                },
            });
        };

        
        this.vdos.d04.onClick = () => {
            ConfirmDialog.open({
                transitionLock: true,
                message: "Confirm Dialog ........ OK",
                buttonText: "OK",
                cancelText: "Cancel",
                onButtonClick: () => {
                    console.log("....OK");
                },
                onCancelClick: () => {
                    console.log("....Cancel");
                },
            });
        };

        this.vdos.d05.onClick = async () => {
            Transition.lock = true;
            const load = LoadingDialog.open("dialog wait (1/3)");
            
            await Lib.sleep(1000);

            load.message = "dialog wait (2/3)";

            await Lib.sleep(1000);

            load.message = "dialog wait (3/3)";

            await Lib.sleep(1000);

            load.close();
            Transition.lock = false;
        };

        this.vdos.d06.onClick = () => {
            Transition.lock = true;
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
                    Transition.lock = false;
                };
            };
        };

        this.vdos.d07.onClick = () => {
            const dialog = BottomupDialog.open({
                html: `<div class="m"><div><b>Bottom Up Dialog</b></div>
<div>Text Sample Text Sample.....</div>
<div>Text Sample Text Sample.....</div>
<div>Text Sample Text Sample.....</div>
<div style="overflow:hidden;zoom:1;"><a v="close" style="float:left">Close</a><a v="button" style="float:right">OK</a></div>
</div>`,
            });

            dialog.vdos.close.onClick = () => {
                console.log("Buttonup dialog .... Close");
                dialog.close();
            };

            dialog.vdos.button.onClick = () => {
                console.log("Buttonup dialog .... OK");
                dialog.close();
            };

        };
    }
}