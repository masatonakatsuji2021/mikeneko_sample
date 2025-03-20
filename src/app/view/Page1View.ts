import { Transition } from "Transition";
import { View } from "app/view/View";
import { HeaderUI } from "app/ui/HeaderUI";
import { GetMaps } from "RouteMap";

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
            Transition.move(GetMaps().page2);
        };
    }
}