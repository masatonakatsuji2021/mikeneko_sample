"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailView = void 0;
const View_1 = require("app/view/View");
const Page4View_1 = require("app/view/Page4View");
class DetailView extends View_1.View {
    handle(id) {
        this.title = "Page4 (index = " + id + ")";
        let item;
        Page4View_1.Page4View.stub.forEach((s_) => {
            if (s_.id != id)
                return;
            item = s_;
        });
        this.mjs.name.text = item.name;
        this.mjs.code.text = item.code;
        this.mjs.description.text = item.description;
    }
}
exports.DetailView = DetailView;
