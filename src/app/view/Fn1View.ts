import { HeaderUI } from "app/ui/HeaderUI";
import { View } from "app/view/View";

export class Fn1View extends View {

    public handle() {
        HeaderUI
            .visible(true)
            .back(true)
            .title("Function Test")
        ;
    }

}