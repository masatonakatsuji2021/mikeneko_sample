import { Response } from "Response";
import { View } from "app/view/View";
import { Test1Dialog } from "app/dialog/Test1Dialog";

export class Page2View extends View {

    public handle() {
        this.title = "Page2";
        this.backMode = true;

        this.mjs.dialog1.onClick = () => {
            const dialog = Response.openDialogOrigin("<div class=\"m10\">Dialog1 OK....</div>");
            setTimeout(()=>{
                dialog.close();
            }, 4000);
        };

        this.mjs.dialog2.onClick = () => {
            Test1Dialog.open("Dialog Message 1 .... ok");
        };

        this.mjs.dialog2a.onClick = () => {
            Test1Dialog.open("Title Test", "Dialog Message 2 .... ok");
        };

        this.mjs.dialog3.onClick = () => {
            const dialog = Response.openDialog("loading");
            setTimeout(()=>{
                dialog.close();
            }, 4000);
        };
    }
}