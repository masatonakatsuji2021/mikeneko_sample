import { BuildHandle as BH_ } from "saiberian";
import { BuildPlatrom } from "saiberian/src/Builder";

export class BuildHandle extends BH_ {

    public static handleBegin(platform : BuildPlatrom): void {
        console.log("+++++++ Handle Begin ..... OK ++++++++++++++++++++");
        console.log(platform);
    }

    public static handleComplete(platform : BuildPlatrom): void {
        console.log("+++++++ Handle Complete ..... OK ++++++++++++++++++++");
        console.log(platform);
    }

}