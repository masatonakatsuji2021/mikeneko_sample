import { Response } from "Response";
import { Lib } from "Lib";
import { View } from "app/view/View";
import { RURL } from "app/config/Routes";
import { SelectMenuView } from "app/view/SelectMenuView";

export class Type1View extends View {

    private stt: NodeJS.Timeout;

    private selectValue : number;

    public handle() {
        this.title = "Page1 (Type1)";

        this.vdos.throwBtn.onClick = () => {
            throw Error("ERROR TEST!");
        };

        // SelectMenuBtn on click event handle....
        this.vdos.selectMenuBtn.onClick = async () => {

            // Open StackMenuView in a stack.
            // When returning, the return value is returned after the selection.
            const value = await SelectMenuView.stackOpen(this.selectValue) as number;

            this.selectValue = value;

            this.vdos.selectValue.text = "";
            if (value != undefined) this.vdos.selectValue.text = "(" + value + ")";

            this.title = "Page1 (Type1)";
        };

        // When you press the type2 button
        this.vdos.type2Btn.onClick = () => {
            // move to Type2
            Response.next(RURL.Page1.Type2);
        };

        this.setDateTime();
        this.stt = setInterval(()=>{
            this.setDateTime();
        }, 250);
    }

    private setDateTime() {
        this.vdos.datetime.text = Lib.datetime().format("YYYY/MM/DD HH:II:SS");
    }

    public handleLeave() {
        console.log("stop timer");
        clearInterval(this.stt);
    }
}