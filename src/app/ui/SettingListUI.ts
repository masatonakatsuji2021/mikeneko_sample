import { UI } from "UI";
import { VirtualDom } from "VirtualDom";

export class SettingListUI extends UI {

    private static listUIs = [];

    public static open(vdo: VirtualDom, list: Array<any>) {

        for(let n = 0 ; n < list.length ; n++) {
            const l_ = list[n];

            const listUI = this.append(vdo);

            listUI.vdos.name.text = l_.name;
            listUI.vdos.radio.data("data", l_);

            this.listUIs.push(listUI);
        }        
    }

    public static getValue(){
        let value;
        for(let n = 0 ; n < this.listUIs.length ; n++){
            const listUI = this.listUIs[n];
            if (listUI.vdos.radio.checked) {
                value = listUI.vdos.radio.data("data");
                break;
            }
        }
        this.listUIs = [];
        return value;
    }
}