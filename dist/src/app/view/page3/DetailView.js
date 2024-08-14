"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailView = void 0;
const View_1 = require("app/view/View");
class DetailView extends View_1.View {
    handle(index) {
        this.title = "Page3";
        this.backMode = true;
        this.mjs.index.text = index;
    }
}
exports.DetailView = DetailView;
