import { Response } from "Response";
import { View } from "app/view/View";
import { RURL } from "app/config/Routes";
import { HeaderUI } from "app/ui/HeaderUI";

/**
 * Home View Class
 * Display screen immediately after launching the app.
 */
export class HomeView extends View {

    public handle() {
        this.vdo.addClass("main");

        HeaderUI.visible(false);

        this.vdos.bottom.onClick = () => {
            this.vdos.menu.addClass("ontop");
        };

        this.vdos.close.onClick = () => {
            this.vdos.menu.removeClass("ontop");
        };

        this.vdos.page1.onClick = () => {
            Response.next(RURL.Page1);
        };

        this.vdos.list.onClick = () => {
            Response.next(RURL.List);
        };

        this.vdos.form.onClick = () => {
            Response.next(RURL.Form);
        };

        this.vdos.dialog.onClick = () => {
            Response.next(RURL.Dialog);
        };
    }
}