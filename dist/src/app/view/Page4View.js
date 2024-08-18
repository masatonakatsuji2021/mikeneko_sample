"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page4View = void 0;
const View_1 = require("app/view/View");
class Page4View extends View_1.View {
    handle() {
        this.title = "Page4";
        this.backMode = true;
        this.mjs.send.onClick = () => {
            console.log({
                value1: this.mjs.value1.value,
                value2: this.mjs.value2.value,
                value3: this.mjs.value3.value,
                value4: this.mjs.value4.value,
                value5: this.mjs.value5.value,
                value6: this.mjs.value6.value,
            });
        };
    }
}
exports.Page4View = Page4View;
