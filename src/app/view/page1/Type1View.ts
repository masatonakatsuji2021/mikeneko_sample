import { Response } from "Response";
import { Lib } from "Lib";
import { View } from "app/view/View";
import { RURL } from "app/config/Routes";

export class Type1View extends View {

    private stt: NodeJS.Timeout;

    public handleAlways(){
        this.title = "Page1 (Type1)";
    }

    private selectValue : number;

    public handle() {

        this.vdos.throwBtn.onClick = () => {
            throw Error("ERROR TEST!");
        };

        this.vdos.selectMenuBtn.onClick = async () => {
            const value = await Response.next(RURL.SelectMenu, this.selectValue);
            this.selectValue = value;
            if (value == undefined) {
                this.vdos.selectValue.text = "";
            }
            else {
                this.vdos.selectValue.text = "(" + value + ")";
            }
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
        clearInterval(this.stt);
    }
}