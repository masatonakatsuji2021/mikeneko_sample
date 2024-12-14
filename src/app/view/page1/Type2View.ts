import { Response } from "Response";
import { View } from "app/view/View";
import { RURL } from "app/config/Routes";
import { Data } from "Data";

export class Type2View extends View {

    public handleAlways(){
        this.title = "Page1 (Type2)";
    }

    public handle() {

        console.log(Data.get("history"));
        this.vdos.resetBtn.onClick = async () => {
            await Response.back(RURL.Home);
        };
    }
}