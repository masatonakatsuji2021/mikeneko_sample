import { Transition } from "Core";
import { View } from "app/view/View";
import { Maps } from "app/config/Maps";
import { HeaderUI } from "app/ui/HeaderUI";
import { AnimationClassSelector } from "App";

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
            this.closeMenu();
        };

        this.vdos.page1.onClick = () => {
            this.closeMenu();
            Transition.next(Maps.page1);
        };

        this.vdos.list.onClick = () => {
            this.closeMenu();
            Transition.move(Maps.page3.list);
        };

        this.vdos.form.onClick = () => {
            this.closeMenu();
            Transition.move(Maps.form.main);
        };

        this.vdos.dialog.onClick = () => {
            this.closeMenu();
            Transition.move(Maps.dialog);
        };

        this.vdos.uitest.onClick = () => {
            this.closeMenu();
            Transition.move(Maps.uitest);
        };

        this.vdos.freePage.onClick = () => {
            this.closeMenu();
            Transition.move(Maps.freePage);
        };

        this.vdos.fn1.onClick = () => {
            this.closeMenu();
            Transition.move(Maps.fn1);
        };
    }

    private closeMenu() {
        this.vdos.menu.removeClass("ontop");
    }
}