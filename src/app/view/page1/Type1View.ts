import { View } from "app/view/View";

export class Type1View extends View {

    private interval : NodeJS.Timeout;

    public handle() { 
        this.title = "Page1 Type1";

        this.setDt();
        this.interval = setInterval(()=>{
            this.setDt();
        }, 1000);
    }

    private setDt() {
        const d_ = new Date();
        this.vdos.datetime.text = "DateTime = " + 
            d_.getFullYear() + "/" + 
            ("00" + (d_.getMonth() + 1)).slice(-2) + "/" +
            ("00" + d_.getDate()).slice(-2) + " " + 
            ("00" + d_.getHours()).slice(-2) + ":" + 
            ("00" + d_.getMinutes()).slice(-2) + ":" + 
            ("00" + d_.getSeconds()).slice(-2)
        ;
    }

    // Screen-off handler.
    public handleLeave() {
        // Interval Stop.
        clearInterval(this.interval);
    }
}