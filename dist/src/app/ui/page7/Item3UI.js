"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item3UI = void 0;
const UI_1 = require("UI");
class Item3UI extends UI_1.UI {
    set index(index) {
        this.mjs.message.text = "Item3 Message " + index + "....";
    }
}
exports.Item3UI = Item3UI;
