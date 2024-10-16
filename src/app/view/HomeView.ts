import { Lib } from "Lib";
import { Response } from "Response";
import { View } from "app/view/View";
import { LoadingDialog } from "app/dialog/LoadingDialog";

/**
 * Home View Class
 * Display screen immediately after launching the app.
 */
export class HomeView extends View {

    public handle() {
        this.back = false;
        this.title = "Home";

        // When the page1 button is pressed.
        this.vdos.page1.onClick = () => {
            // next to Page1.
            Response.next("/page1a");
        };

        // When the page2 button is pressed.
        this.vdos.page2.onClick = () => {
            // next to Page2.
            Response.next("/page2");
        };

        // When the page3 button is pressed.
        this.vdos.page3.onClick = () => {
            // next to Page3.
            Response.next("/page3");
        };

        // When the page4 button is pressed.
        this.vdos.page4.onClick = () => {
            // next to Page4.
            Response.next("/page4");
        };

        // When the page5 button is pressed.
        this.vdos.page5.onClick = () => {
            // next to Page5.
            Response.next("/page5");
        };

        // When the page6 button is pressed.
        this.vdos.page6.onClick = async () => {

            // Lock and stop screen transition function
            Response.lock = true;

            // Loading Dialog Open
            const load : LoadingDialog = LoadingDialog.open();
            
            load.message = "wait(1/3)....";

            // 1s wait...
            await Lib.sleep(1000);

            load.message = "wait(2/3)....";

            // 1s wait...
            await Lib.sleep(1000);

            load.message = "wait(3/3)....";

            // 1s wait...
            await Lib.sleep(1000);

            // Loading Dialog Close.
            load.close();

            // Unlock screen transitions
            Response.lock = false;

            // next to Page6..
            Response.next("/page6");
        };

        // When the page7 button is pressed.
        this.vdos.page7.onClick = () => {
            // next to Page7.
            Response.next("/page7");
        };
    }
}