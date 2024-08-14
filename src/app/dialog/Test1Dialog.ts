import { Dialog } from "Dialog";
import { Response } from "Response";

export class Test1Dialog extends Dialog {

    public static open(arg1: string, arg2? : string) {
        let message: string, title: string;
        if (arg2) {
            title = arg1;
            message = arg2;
        }
        else {
            message = arg1;
        }
        Response.openDialog("test1", {
            sendData: {
                message: message,  
                title: title,
            },
        });
    }

    public handle(sendData : any) {
        this.mjs.title.style({display: "none"});
        this.mjs.message.text = sendData.message;
        if (sendData.title) {
            this.mjs.title.style({display: null});
            this.mjs.title.text = sendData.title;
        }
        this.mjs.close.onClick = () => { 
            // close button click....
            this.close();
        };
    }
}