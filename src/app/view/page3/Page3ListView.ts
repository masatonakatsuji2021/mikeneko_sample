import { View } from "app/view/View";
import { HeaderUI } from "app/ui/HeaderUI";
import { ListUI } from "app/ui/ListUI";
import { Page3Data } from "app/view/page3/Page3Data";

export class Page3ListView extends View {

    public handle() {
        HeaderUI
            .visible(true)
            .back(true)
            .title("Item List")
        ;

        ListUI.open(this.vdos.list, Page3Data);
    }

}