import { View } from "View";

export class ViewTestView extends View {

    public template: string = "default";

    public head: string = "head";
    
    public handle() {
        console.log("view test ..... ok");
    }
}