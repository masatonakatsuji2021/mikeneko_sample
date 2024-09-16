import { Response } from "Response";
import { View } from "app/view/View";

export class Page1View extends View {

    public handle() {
        this.title = "Page1";
        
        this.mjs.btn.childs.next.onClick = () => {
            // move to type1
            Response.next("/page1/type1");
        };

        this.mjs.btn.childs.replace.onClick = () => {
            // move to type1 (replace)
            Response.replace("/page1/type1");
        };
    }
}