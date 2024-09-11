"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeView = void 0;
const View_1 = require("app/view/View");
class HomeView extends View_1.View {
    handle() {
        this.title = "Mikeneko";
        this.backMode = false;
        this.mjs.test.style({ color: "lightblue" });
        this.mjs.test.childs.sub1.text = "Text Area Test....(sub1)";
        this.mjs.test.childs.sub2.text = "Text Area Test....(sub2)";
    }
}
exports.HomeView = HomeView;
