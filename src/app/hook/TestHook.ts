import { Hook } from "Hook";
import { RouteMap } from "RouteMap";
import { View } from "View";

export class TestHook extends Hook {

    public onStartorBegin(): void {
        console.log("アプリ起動直後!");
    }

    public onTransitionNext(target: string | number | RouteMap | typeof View): void {
        console.log("次画面に移動");
    }

    public onSetRenderContent(content: string): string | void {
        return content.split("{abcd}").join("埋め込みテキスト....!");
    }
}