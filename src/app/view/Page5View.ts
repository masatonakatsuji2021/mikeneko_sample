import { View } from "app/view/View";
import { Page5Validation } from "app/validation/Page5Validation";

export class Page5View extends View {

    public handle() {
        this.title = "Page5";
        this.backMode = true;

        this.mjs.submit.onClick = () => {

            const post = {
                name: this.mjs.name.value,
                code: this.mjs.code.value,
            };

            const res = Page5Validation.verifyBind(this.mjs, post);

            if (!res.status) {
                console.log(res.get());
                console.log(res.get("name"));
                console.log(res);    
                return;
            }

            console.log(post);
        };
    }
}