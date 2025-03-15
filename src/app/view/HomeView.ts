import { Transition } from "Transition";
import { View } from "./View";
import { Maps } from "../config/Maps";
import { HeaderUI } from "../ui/HeaderUI";
import { VirtualDom } from "VirtualDom";

/**
 * ### Home View Class
 * Display screen immediately after launching the app.  
 * [renderin HTML](../../rendering/view/home.html)
 */
export class HomeView extends View {

    public vdos : {

        /** bottom button */
        bottom: VirtualDom,

        /** bottom up menu */
        menu : VirtualDom,

        /** close button */
        close: VirtualDom,

        /** page1 button */
        page1: VirtualDom,

        /** list button */
        list: VirtualDom,

        /** form button */
        form: VirtualDom,

        /** dialog button */
        dialog: VirtualDom,

        /** uitest button */
        uitest: VirtualDom,

        /** freePage button */
        freePage: VirtualDom,

        /** fn1 button */
        fn1: VirtualDom,
    };

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