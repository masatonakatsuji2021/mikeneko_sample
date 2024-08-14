import { View as V_ } from "View";
import { Response } from "Response";

import { Data } from "Data";

export class View extends V_ {

    public template: string = "default";

    public head: string = "head";

    public header: string = "header";

    public set title(title: string) {
        this.mjs.headerTitle.text = title;
    }

    public set backMode(status: boolean) {
        if (status) {
            this.mjs.headerBackBtn.style({display: null});
        }
        else {
            this.mjs.headerBackBtn.style({display: "none"});
        }
    }

    public handleHeaderChanged() {
        this.mjs.headerBackBtn.onClick = () => {
            Response.back();
        };
    }
}