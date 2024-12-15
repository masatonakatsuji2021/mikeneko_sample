import { View } from "app/view/View";
import { SelectUI } from "app/ui/SelectUI";

export class SelectMenuView extends View {

    private radios = [];

    public handle(selectValue: number) {
        this.title = "Select Menu";

        const types = {
            0 : "Select0",
            1 : "Select1",
            2 : "Select2",
            3 : "Select3",
            4 : "Select4",
            5 : "Select5",
            6 : "Select6",
        };

        const c = Object.keys(types);
        for(let n = 0 ; n < c.length ; n++) {
            const value = Number(c[n]);
            const name = types[value];

            const selectUI = SelectUI.append(this.vdos.list);
            selectUI.vdos.name.text = name;
            selectUI.vdos.radio.attr("value", value);

            if (selectValue != undefined && selectValue == value) {
                selectUI.vdos.radio.checked = true;
            }

            this.radios.push(selectUI);
        }
    }

    public handleLeaveStackClose() {

        let value;
        this.radios.forEach((selectUI)=>{
            if (selectUI.vdos.radio.checked) value = selectUI.vdos.radio.value;
        });

        return value;
    }
}