import { Dialog } from "Dialog";
import { UI } from "UI";
import { View } from "app/view/View";
import { Item1UI } from "app/ui/page7/Item1UI";
import { Item3UI } from "app/ui/page7/Item3UI";
import { TestDialog } from "app/dialog/TestDialog";

export class Page7View extends View {

    public handle(){
        this.title = "Page7";

        // bind Item1 UI
        Item1UI.bind(this.mjs.item1);

        // bind Item2 UI
        const item2UI : UI = UI.bind(this.mjs.item2, "page7/item2");
        item2UI.mjs.title.text = "Item2 Test...";
        item2UI.mjs.description.text = "Item2 Description Text Text Text Text Text Text Text Text Text Text ...";
        
        // append Item3 UI
        for (let n = 0 ; n < 4 ; n++) {
            const item3UI : Item3UI = Item3UI.append(this.mjs.item3) as Item3UI;
            item3UI.index = n;
        }

        // append Item4 UI
        for (let n = 0 ; n < 4 ; n++) {
            const item4UI : UI = UI.append(this.mjs.item4, "page7/item4");
            item4UI.mjs.message.text = "Item4 Message " + n + " ....";
        }

        this.vdos.dialog1.onClick = () => {
            // "Open Dialog1" buton clicked...
            const test1 = Dialog.show("test");
            console.log(test1);
            test1.vdos.close.onClick = () => {
                test1.close();
            };
        };

        this.vdos.dialog2.onClick = () => {
            // "Open Dialog2" buton clicked...
            const test1 = TestDialog.show();
            console.log(test1);
        };
    }
}