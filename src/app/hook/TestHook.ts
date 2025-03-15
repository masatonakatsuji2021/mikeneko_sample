import { Hook } from "Hook";
import { RouteMap } from "RouteMap";
import { View } from "View";

export class TestHook extends Hook {

    public onStartorBegin(): void {
        console.log("Immediately after launching the app");
    }

    public onTransitionNext(target: string | number | RouteMap | typeof View): void {
        console.log("Move to next screen");
    }

    public onSetRenderContent(content: string): string | void {
        return content.split("{abcd}").join("For embedded testing");
    }
}