import { Background as B_ } from "Background";
import { Dom } from "Dom";
import { Response } from "Response";

export class Background extends B_  {

    public handle(): void {
        console.log("Background ....... ok");

        setTimeout(()=>{
            Dom(".backbtn").onClick=()=>{
                Response.back();
            };
    
        }, 1000);
    }
}