"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page5View = void 0;
const View_1 = require("app/view/View");
const Page5Validation_1 = require("app/validation/Page5Validation");
class Page5View extends View_1.View {
    handle() {
        this.title = "Page5";
        this.backMode = true;
        this.mjs.submit.onClick = () => {
            const post = {
                name: this.mjs.name.value,
                code: this.mjs.code.value,
            };
            const res = Page5Validation_1.Page5Validation.verifyBind(this.mjs, post);
            if (!res.status) {
                console.log(res.get());
                console.log(res.get("name"));
                console.log(res);
                return;
            }
            console.log(post);
        };
    }
}
exports.Page5View = Page5View;
