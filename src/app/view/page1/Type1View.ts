import { Lib } from "Lib";
import { View } from "app/view/View";

export class Type1View extends View {

    private stt: NodeJS.Timeout;

    public handle() {
        this.title = "Page1 (Type1)";

        this.vdos.throwBtn.onClick = () => {
            throw Error("ERROR TEST!");
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