"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeView = void 0;
const View_1 = require("app/view/View");
class HomeView extends View_1.View {
    handle() {
        this.title = "Mikeneko";
        this.backMode = false;
    }
}
exports.HomeView = HomeView;
