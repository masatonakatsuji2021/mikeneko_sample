import { HeaderUI } from "app/ui/HeaderUI";
import { View } from "app/view/View";

export class FreePageView extends View {

    public html : string = "<div class=\"m\">Hallo Free Page</div>";

    public handle() {
        HeaderUI
            .visible(true)
            .back(true)
            .title("FreePage")
        ;
    }
}