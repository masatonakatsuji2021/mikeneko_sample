import { Response } from "Response";
import { View } from "app/view/View";

/**
 * Page1 View Class
 */
export class Page1View extends View {

    public handle() {
        this.title = "Page1";

        // When you press the next button
        this.vdos.btn.childs.next.onClick = () => {
            // move to type1
            Response.next("/page1/type1");
        };

        // When you press the replace button
        this.vdos.btn.childs.replace.onClick = () => {
            // move to type1 (replace)
            Response.replace("/page1/type1");
        };
    }
}