import { View } from "app/view/View";
import { SettingListUI } from "app/ui/SettingListUI";
import { Transition } from "Transition";

/**
 * FormSelect View Class
 */
export class FormSelectView extends View {

    public handle() {
        SettingListUI.open(this.vdos.list, this.lists);

        this.vdos.button.onClick = () => {
            Transition.stackClose(SettingListUI.getValue());
        };
    }

   // public async handleLeaveStackClose() {
   //     return SettingListUI.getValue();
    //}

    private lists = [
        { 
            value: 0,
            name: "Setting 01",
        },
        { 
            value: 1,
            name: "Setting 02",
        },
        { 
            value: 2,
            name: "Setting 03",
        },
        { 
            value: 3,
            name: "Setting 04",
        },
    ];

}