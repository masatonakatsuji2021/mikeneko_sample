import { Response } from "Response";
import { View } from "app/view/View";
import { AlertDialog } from "app/dialog/AlertDialog";
import { ConfirmDialog } from "app/dialog/ConfirmDialog";
import { LoadingDialog } from "app/dialog/LoadingDialog";

export class Page3View extends View {

    public handle() {
        this.title = "Page3";

        this.mjs.d1.onClick = () => {
            // open dialog (test dialog)
            const testDialog = Response.openDialog("test");
            testDialog.mjs.close.onClick = () => {
                testDialog.close();
            };
        };

        this.mjs.d2.onClick = () => {
            // open alert dialog1
            AlertDialog.open(
                "Dialog Title",
                "description text sample \n ... OK!",
                "Close"
            );
        };

        this.mjs.d3.onClick = () => {
            // open alert dialog2
            AlertDialog.open(
                "alert dialog2 description text sample....",
                "Next",
                () => {
                    AlertDialog.open("ok","close",()=>{});
                },
            );
        };

        this.mjs.d4.onClick = () => {
            // open confirm dialog
            ConfirmDialog.open(
                "Confirm dialog description text sample....",
                "Next",
                "Cancel",
                () => {
                    AlertDialog.open("OK","close",()=>{});
                },
                () => { },
            );
        };


        this.mjs.d5.onClick = () => {
            // loading dialog...
            const ld = LoadingDialog.open("Loading Test...");
            setTimeout(()=>{
                ld.close();
            }, 4000);
        };
    }
}