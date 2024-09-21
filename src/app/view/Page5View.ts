import { View } from "app/view/View";
import { Page5Validation } from "app/validation/Page5Validation";
import { AlertDialog } from "app/dialog/AlertDialog";

export class Page5View extends View {

    public handle(){
        this.title = "Page5";

        this.mjs.submit.onClick = () => {

            const post = {
                input1: this.mjs.input1.value,
                input2: this.mjs.input2.value,
                input3: this.mjs.input3.value,
                input4: this.mjs.input4.value,
                input5: this.mjs.input5.value,
            };

            const vres = Page5Validation.verifyBind(this.mjs, post);

            if (!vres.status) return;

            AlertDialog.open(
                "Submit OK!",
                "OK",
                () => {},
            );
        };
    }

}