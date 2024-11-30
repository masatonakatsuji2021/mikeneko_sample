import { Response } from "Response";
import { View } from "app/view/View";
import { RURL } from "app/config/Routes";

/**
 * Page1 View Class
 */
export class Page1View extends View {

    public handle() {
        this.title = "Page1";

        // When you press the next button
        this.vdos.btn.childs.next.onClick = () => {
            // move to type1
            Response.next(RURL.Page1.Type1);
        };

        // When you press the replace button
        this.vdos.btn.childs.replace.onClick = () => {
            // move to type1 (replace)
            Response.replace(RURL.Page1.Type1);
        };
    }
}