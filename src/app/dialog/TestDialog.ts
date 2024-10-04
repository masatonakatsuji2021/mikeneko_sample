import { Dialog } from "Dialog";

export class TestDialog extends Dialog {

    public handle() {

        this.vdos.close.onClick = () => {
            this.close();
        };
    }
}