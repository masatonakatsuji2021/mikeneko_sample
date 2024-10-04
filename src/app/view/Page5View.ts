import { View } from "app/view/View";
import { Page5Validation } from "app/validation/Page5Validation";
import { AlertDialog } from "app/dialog/AlertDialog";

export class Page5View extends View {

    public handle(){
        this.title = "Page5";

        this.vdos.submit.onClick = () => {

            const post = {
                input1: this.vdos.input1.value,
                input2: this.vdos.input2.value,
                input3: this.vdos.input3.value,
                input4: this.vdos.input4.value,
                input5: this.vdos.input5.value,
            };

            const vres = Page5Validation.verifyBind(this.vdos, post);

            if (!vres.status) return;

            AlertDialog.open(
                "Submit OK!",
                "OK",
                () => {},
            );
        };
    }

}