"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewTestView = void 0;
const View_1 = require("View");
class ViewTestView extends View_1.View {
    constructor() {
        super(...arguments);
        this.template = "default";
        this.head = "head";
    }
    handle() {
        console.log("view test ..... ok");
    }
}
exports.ViewTestView = ViewTestView;
