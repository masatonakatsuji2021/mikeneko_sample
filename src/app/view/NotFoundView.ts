import { Response } from "Response";
import { View } from "app/view/View";

export class NotFoundView extends View {

    public handle() {
        this.title = "NOT FOUND PAGE!";

        this.mjs.backBtn.onClick = () => {
            Response.back();
        };
    }
}