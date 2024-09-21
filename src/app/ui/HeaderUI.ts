import { ModernJS } from "ModernJS";
import { Response } from "Response";
import { UI } from "UI";

/**
 * Header UI Class
 */
export class HeaderUI extends UI {

    public static title : ModernJS;
    public static back : ModernJS;

    /**
     * Set the header title
     */
    public static set setTitle(title: string) {
        this.title.text = title;
    }

    /**
     * Show/hide back button
     */
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