import { View } from "app/view/View";
import { HeaderUI } from "app/ui/HeaderUI";
import { Page3Data, Page3DataInterface } from "app/view/page3/Page3Data";

export class Page3DetailView extends View {

    public handle(number : number) {

        const item : Page3DataInterface = Page3Data[number];

        HeaderUI
            .visible(true)
            .back(true)
            .title(item.name)
        ;

        this.vdos.name.text = item.name;
        this.vdos.value.text = item.value;
        this.vdos.description.text = item.description;
    }

}