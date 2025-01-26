import { Transition } from "Core";
import { View } from "app/view/View";
import { HeaderUI } from "app/ui/HeaderUI";
import { MyRouteMaps } from "app/config/RouteMaps";

/**
 * Page1 View Class
 */
export class Page1View extends View {

    public handle() {
        HeaderUI
            .visible(true)
            .back(true)
            .title("Page1")
        ;

        this.vdos.button.onClick = () => {
            Transition.move(MyRouteMaps.page2);
        };
    }
}