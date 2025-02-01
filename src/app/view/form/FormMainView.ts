
import { Transition } from "Transition";
import { Maps } from "app/config/Maps";
import { HeaderUI } from "app/ui/HeaderUI";
import { FormValidation } from "app/validation/FormValidation";
import { View } from "app/view/View";

/**
 * FormMain View Class
 */
export class FormMainView extends View {

    private otherset;

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

            const value = await Transition.stack(Maps.form.select);

            this.vdos.othersettext.text = value.name;
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
            };

            if (!FormValidation.verifyBind(this.vdos, post).status) return;

            console.log(post);

            alert("Submit OK.");
        };
    }
}