import { UI, Transition, VirtualDom } from "Core";
import { Maps } from "app/config/Maps";
import { Page3DataInterface } from "app/view/page3/Page3Data";

export class ListUI extends UI {

    public static open(vdo: VirtualDom, lists : Array<Page3DataInterface>) {
               
        for(let n = 0 ; n < lists.length ; n++){
            const l_ = lists[n];

            const listUI = this.append(vdo);

            listUI.vdos.name.text = l_.name;

            listUI.vdos.button
                .onClick = () => {
                    Transition.move(Maps.page3.detail, [ n ]);
                }
            ;
        }
    }
}

