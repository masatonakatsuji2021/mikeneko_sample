import { ModernJS } from "ModernJS";
import { Response } from "Response";
import { UI } from "UI";

export class HeaderUI extends UI {

    public static title : ModernJS;
    public static back : ModernJS;

    public static set setTitle(title: string) {
        this.title.text = title;
    }

    public static set setBack(status: boolean) {
        if (status) {
            this.back.display = true;
        }
        else {
            this.back.display = false;
        }
    }
    
    public handle() {
        HeaderUI.title = this.mjs.title;
        HeaderUI.back = this.mjs.back;

        this.mjs.back.onClick = () => {
            Response.back();
        };
    }
}