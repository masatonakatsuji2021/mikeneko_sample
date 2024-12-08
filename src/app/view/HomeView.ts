import { Lib } from "Lib";
import { Response } from "Response";
import { View } from "app/view/View";
import { LoadingDialog } from "app/dialog/LoadingDialog";
import { RURL } from "app/config/Routes";

/**
 * Home View Class
 * Display screen immediately after launching the app.
 */
export class HomeView extends View {

    /** handle back  */
    public handleBack() {
        console.log("handle Back ... OK");
    }

    /** handle next */
    public handleNext() {
        console.log("handle Next ... OK");
    }

    public handle() {
        this.back = false;
        this.title = "Home";

        // When the page1 button is pressed.
        this.vdos.page1.onClick = () => {

            // next to Page1.
            Response.next(RURL.Page1.Top);
        };

        // When the page2 button is pressed.
        this.vdos.page2.onClick = () => {

            // next to Page2.
            Response.next(RURL.Page2.Top);
        };

        // When the page3 button is pressed.
        this.vdos.page3.onClick = () => {

            // next to Page3.
            Response.next(RURL.Page3);
        };

        // When the page4 button is pressed.
        this.vdos.page4.onClick = () => {

            // next to Page4.
            Response.next(RURL.Page4.Top);
        };

        // When the page5 button is pressed.
        this.vdos.page5.onClick = () => {

            // next to Page5.
            Response.next(RURL.Page5);
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
            Response.next(RURL.Page6);
        };

        // When the page7 button is pressed.
        this.vdos.page7.onClick = () => {
            // next to Page7.
            Response.next(RURL.Page7);
        };

        // When the not found page accessed..
        this.vdos.pageNotfound.onClick = () => {
            // next to Arekore
            Response.next(RURL.Arekore);
        };
    }
}