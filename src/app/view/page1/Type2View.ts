import { Response } from "Response";
import { View } from "app/view/View";
import { RURL } from "app/config/Routes";
import { Data } from "Data";

export class Type2View extends View {

    public handle() {
        this.title = "Page1 (Type2)";

        console.log(Data.get("history"));
        this.vdos.resetBtn.onClick = async () => {
            Response.back();
        };
    }
}