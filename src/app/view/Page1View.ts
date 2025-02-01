import { Transition } from "Core";
import { View } from "app/view/View";
import { HeaderUI } from "app/ui/HeaderUI";
import { Maps } from "app/config/Maps";

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
            Transition.move(Maps.page2);
        };
    }
}