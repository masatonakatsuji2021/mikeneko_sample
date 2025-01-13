import { Response } from "Response";
import { UI } from "UI";

/**
 * Header UI Class
 */
export class HeaderUI extends UI {

    private static vdo;
    private static vdos;

    public handle() {
        this.vdo.addClass("hide");
        HeaderUI.vdo = this.vdo;
        HeaderUI.vdos = this.vdos;

        this.vdos.back.onClick = () => {
            Response.back();
        };
    }

    public static visible(status: boolean) : typeof HeaderUI {
        if (status) {        
            setTimeout(()=>{
                this.vdo.removeClass("hide");
            },10);
        }
        else {
            setTimeout(()=>{
                this.vdo.addClass("hide");
            },10);
        }
        return HeaderUI;
    }

    public static back(status: boolean) : typeof HeaderUI {
        if (status) {
            this.vdos.back.removeClass("hide");
        }
        else {
            this.vdos.back.addClass("hide");
        }
        return HeaderUI;
    }

    public static title(title: string) : typeof HeaderUI {
        this.vdos.title.text = title;
        return HeaderUI;
    }
}