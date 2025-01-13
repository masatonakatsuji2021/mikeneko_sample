import { View } from "app/view/View";
import { HeaderUI } from "app/ui/HeaderUI";
import { IListItem } from "app/ui/ListUI";

export class ListDetailView extends View {

    public handle() {
        const item = this.sendData as IListItem;

        HeaderUI
            .title(item.name);

        this.vdos.name.text = item.name;
        this.vdos.value.text = item.value;
    }

}