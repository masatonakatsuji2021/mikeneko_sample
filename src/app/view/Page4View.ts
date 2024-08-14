import { View } from "app/view/View";

export class Page4View extends View {

    public handle() {
        this.title = "Page4";
        this.backMode = true;

        this.mjs.send.onClick = () => {
            console.log({
                value1: this.mjs.value1.value,
                value2: this.mjs.value2.value,
                value3: this.mjs.value3.value,
            });

        };
    }
}