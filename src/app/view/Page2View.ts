import { View } from "app/view/View";
import { HeaderUI } from "app/ui/HeaderUI";

/**
 * Page2 View Class
 */
export class Page2View extends View {

    public handle() {
        HeaderUI
            .visible(true)
            .back(true)
            .title("Page2")
        ;
        

    }
}