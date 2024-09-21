import { Response } from "Response";
import { View } from "app/view/View";

/**
 * Page2 View Class
 */
export class Page2View extends View {

    public handle() {
        this.title = "Page2";

        this.mjs.description.text = "Description Text Text Text...";

        // item (first)
        const first = this.mjs.item.first;
        first.text += "(First)";
        first.style({ color: "pink" });

        // item (last)
        const last = this.mjs.item.last;
        last.text += "(Last)";
        last.style({ color : "lightgreen" });

        // item (index = 2)
        const id3 = this.mjs.item.index(2);
        id3.text += "(target)";
        id3.style({ color: "yellow" });

        // button1
        const button1 = this.mjs.button1;
        button1.datas.alertMessage = "Alert Message Test Sample ....";
        button1.onClick = (_, my) => {
            setTimeout(()=>{
                alert(my.datas.alertMessage);
            }, 200);
        };

        // link 
        this.mjs.link1.onClick = () => {
            Response.next("/page2/1");
        };
        this.mjs.link2.onClick = () => {
            Response.next("/page2/2");
        };
        this.mjs.link3.onClick = () => {
            Response.next("/page2/3");
        };
    }
}