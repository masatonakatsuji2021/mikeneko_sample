import { Response } from "Response";
import { View } from "app/view/View";
import { HeaderUI } from "app/ui/HeaderUI";
import { RURL } from "app/config/Routes";

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
            Response.next(RURL.Page2);
        };
    }
}