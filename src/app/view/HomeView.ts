import { Transition } from "Core";
import { View } from "app/view/View";
import { MyRouteMaps } from "app/config/RouteMaps";
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
            Transition.move(MyRouteMaps.page1);
        };

        this.vdos.list.onClick = () => {
            Transition.move(MyRouteMaps.page3.list);
        };

        this.vdos.form.onClick = () => {
            Transition.move(MyRouteMaps.form.main);
        };

        this.vdos.dialog.onClick = () => {
            Transition.move(MyRouteMaps.dialog);
        };    

        this.vdos.freePage.onClick = () => {
            Transition.move(MyRouteMaps.freePage);
        };

        this.vdos.fn1.onClick = () => {
            Transition.move(MyRouteMaps.fn1);
        };
    }
}