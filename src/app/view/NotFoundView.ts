import { HeaderUI } from "app/ui/HeaderUI";
import { View } from "app/view/View";
import { Transition } from "Transition";

export class NotFoundView extends View {

    public handle() {
        HeaderUI.visible(false);

        this.vdos.backBtn.onClick = () => {
            Transition.back();
        };
    }
}