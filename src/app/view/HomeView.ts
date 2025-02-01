import { Transition } from "Core";
import { View } from "app/view/View";
import { Maps } from "app/config/Maps";
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
            Transition.next(Maps.page1);
        };

        this.vdos.list.onClick = () => {
            Transition.move(Maps.page3.list);
        };

        this.vdos.form.onClick = () => {
            Transition.move(Maps.form.main);
        };

        this.vdos.dialog.onClick = () => {
            Transition.move(Maps.dialog);
        };    

        this.vdos.freePage.onClick = () => {
            Transition.move(Maps.freePage);
        };

        this.vdos.fn1.onClick = () => {
            Transition.move(Maps.fn1);
        };
    }
}