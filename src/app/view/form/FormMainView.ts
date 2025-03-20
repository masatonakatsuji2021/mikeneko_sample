
import { Transition } from "Transition";
import { GetMaps } from "RouteMap";
import { HeaderUI } from "app/ui/HeaderUI";
import { FormValidation } from "app/validation/FormValidation";
import { View } from "app/view/View";

/**
 * FormMain View Class
 */
export class FormMainView extends View {

    private otherset : number;
    
    private othersetText : string;

    public handle() {
        HeaderUI
            .visible(true)
            .back(true)
            .title("Form View")
        ;

        this.vdos.stype.selectAddParam({
            0: "type 01",
            1: "type 02",
            2: "type 03",
            3: "type 04",
        });

        this.vdos.otherset.onClick = async () => {

            const value = await Transition.stack(GetMaps().form.select);
            if (!value) return;
            this.vdos.othersettext.text = value.name;
            this.othersetText = value.name;
            this.otherset = value.value;
        };

        this.vdos.submit.onClick = () => {

            const post = {
                name: this.vdos.name.value,
                username: this.vdos.username.value,
                numberic: this.vdos.numberic.value,
                stype: this.vdos.stype.value,
                checkbox: this.vdos.checkbox.value,
                otherset: this.otherset,
                othersetText: this.othersetText,
            };

            if (!FormValidation.verifyBind(this.vdos, post).status) return;

            Transition.stack(GetMaps().form.result, post);
        };
    }
}