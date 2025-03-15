import { View } from "app/view/View";
import { Transition } from "Transition";

export class FormResultView extends View {
    
    public handle(post) {

        this.vdos.name.text = post.name;
        this.vdos.username.text = post.username;
        this.vdos.numberic.text = post.numberic;
        this.vdos.stype.text = this.stypeList[post.stype];
        let checkboxs : Array<string> = [];
        for(let n = 0 ; n < post.checkbox.length; n++) {
            const checkbox = post.checkbox[n];
            checkboxs.push("Checkbox0" + checkbox);
        }
        this.vdos.checkbox.text = checkboxs.join(",");
        this.vdos.otherset.text = post.othersetText;

        this.vdos.back.onClick = () => {
            Transition.back();
        };
    }

    private stypeList = {
        0: "type 01",
        1: "type 02",
        2: "type 03",
        3: "type 04",
    };
}