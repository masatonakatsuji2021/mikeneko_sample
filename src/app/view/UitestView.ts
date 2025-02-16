import { HeaderUI } from "app/ui/HeaderUI";
import { Test1UI } from "app/ui/Test1UI";
import { View } from "app/view/View";
import { Transition } from "Transition";

export class UitestView extends View {

    public handle() {

        HeaderUI
            .visible(true)
            .back(true)
            .title("UI Test Sample")
        ;

        this.vdos.test1.onClick = () => {
            Test1UI.bind(this.vdos.test1bind);
        };
        
        this.vdos.test2.onClick = () => {
            Transition.bindUI(this.vdos.test2bind, "test2");
        };
    }
}