import { Response } from "Response";
import { View } from "app/view/View";
import { LoadingDialog } from "app/dialog/LoadingDialog";

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

        this.mjs.page5.onClick = () => {
            // next to Page5.
            Response.next("/page5");
        };

        this.mjs.page6.onClick = () => {
            // next to Page5.
            Response.lock = true;
            const load = LoadingDialog.open("3s wait...");
            setTimeout(()=>{
                load.close();
                Response.lock = false;
                Response.next("/page6");
            }, 3000);
        };
    }

}