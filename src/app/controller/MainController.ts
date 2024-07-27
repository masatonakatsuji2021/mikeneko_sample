import { Controller } from "Controller";
import { Special } from "app/Special";
import { Response } from "Response";

export class MainController extends Controller{

    public template: string = "default";

    public head : string = "head";

    public handleBefore(beginStatus?: boolean): void {
        console.log("Main Controller Before .... OK");
    }
    
    public handleAfter(beginStatus?: boolean): void {
        console.log("Main Controller After .... OK");
    }

    public handleRenderBefore(beginStatus?: boolean): void {
        console.log(this.mjs);
        this.mjs.backbtn.onClick = () => {
            Response.back();
        };
    }

    public index(){
        console.log(Special.run());
        console.log("Main Controller Index ...OK");
    }

    public page1(){
        this.mjs.button1.onClick = () => {
            alert("Page1 Click ... OK");
        };
    }

}