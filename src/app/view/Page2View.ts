import { Response } from "Response";
import { View } from "app/view/View";

/**
 * Page2 View Class
 */
export class Page2View extends View {

    public handle() {
        this.title = "Page2";

        this.vdos.description.text = "Description Text Text Text...";

        // item (first)
        const first = this.vdos.item.first;
        first.text += "(First)";
        first.style({ color: "pink" });

        // item (last)
        const last = this.vdos.item.last;
        last.text += "(Last)";
        last.style({ color : "lightgreen" });

        // item (index = 2)
        const id3 = this.vdos.item.index(2);
        id3.text += "(target)";
        id3.style({ color: "yellow" });

        // button1
        const button1 = this.vdos.button1;
        button1.datas.alertMessage = "Alert Message Test Sample ....";
        button1.onClick = (_, my) => {
            setTimeout(()=>{
                alert(my.datas.alertMessage);
            }, 200);
        };

        // link 
        this.vdos.link1.onClick = () => {
            Response.next("/page2/1");
        };
        this.vdos.link2.onClick = () => {
            Response.next("/page2/2");
        };
        this.vdos.link3.onClick = () => {
            Response.next("/page2/3");
        };
    }
}