import { View as _ } from "View";
import { HeaderUI } from "app/ui/HeaderUI";

export class View extends _ {

    public template: string = "default";

    public header: string = "header";

    public head: string = "head";

    /**
     * ***title*** : Sets the header title text.
     */
    public set title(title: string) {
        HeaderUI.setTitle = title;
    }
    
    /**
     * ***back*** : header Back button visibility flag.
     */
    public set back(status: boolean) {
        HeaderUI.setBack = status;
    }
    
    public handleRenderBefore() {
        this.back = true;
    }

}