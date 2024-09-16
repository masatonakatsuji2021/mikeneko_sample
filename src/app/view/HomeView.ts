import { Response } from "Response";
import { View } from "app/view/View";

export class HomeView extends View {

    public handle() {
        this.back = false;
        this.title = "Home";

        this.mjs.page1.onClick = () => {
            // next to Page1.
            Response.next("/page1");
        };

        this.mjs.page2.onClick = () => {
            // next to Page2.
            Response.next("/page2");
        };

        this.mjs.page3.onClick = () => {
            // next to Page3.
            Response.next("/page3");
        };

        this.mjs.page4.onClick = () => {
            // next to Page4.
            Response.next("/page4");
        };
    }

}