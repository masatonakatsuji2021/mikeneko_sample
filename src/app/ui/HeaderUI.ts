import { VirtualDom } from "VirtualDom";
import { Response } from "Response";
import { UI } from "UI";

/**
 * Header UI Class
 */
export class HeaderUI extends UI {

    public static title : VirtualDom;
    public static back : VirtualDom;

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
        HeaderUI.title = this.vdos.title;
        HeaderUI.back = this.vdos.back;

        this.vdos.back.onClick = () => {
            Response.back();
        };
    }
}