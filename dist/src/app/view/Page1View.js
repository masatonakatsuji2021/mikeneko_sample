"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page1View = void 0;
const View_1 = require("app/view/View");
class Page1View extends View_1.View {
    handle() {
        this.title = "Page1";
        this.backMode = true;
    }
}
exports.Page1View = Page1View;
