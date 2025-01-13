import { UI, Response, VirtualDom } from "Core";
import { RURL } from "app/config/Routes";

export class ListUI extends UI {

    public static open(vdo: VirtualDom, lists : Array<IListItem>) {
               
        for(let n = 0 ; n < lists.length ; n++){
            const l_ = lists[n];

            const listUI = this.append(vdo);

            listUI.vdos.name.text = l_.name;

            listUI.vdos.button
                .onClick = () => {
                    Response.next(RURL.ListDetail, l_);
                }
            ;
        }
    }
}

export interface IListItem {

    name: string,

    value: number,

    description: string,
}