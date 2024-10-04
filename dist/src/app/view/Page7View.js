"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page7View = void 0;
const Dialog_1 = require("Dialog");
const UI_1 = require("UI");
const View_1 = require("app/view/View");
const Item1UI_1 = require("app/ui/page7/Item1UI");
const Item3UI_1 = require("app/ui/page7/Item3UI");
const TestDialog_1 = require("app/dialog/TestDialog");
class Page7View extends View_1.View {
    handle() {
        this.title = "Page7";
        // bind Item1 UI
        Item1UI_1.Item1UI.bind(this.mjs.item1);
        // bind Item2 UI
        const item2UI = UI_1.UI.bind(this.mjs.item2, "page7/item2");
        item2UI.mjs.title.text = "Item2 Test...";
        item2UI.mjs.description.text = "Item2 Description Text Text Text Text Text Text Text Text Text Text ...";
        // append Item3 UI
        for (let n = 0; n < 4; n++) {
            const item3UI = Item3UI_1.Item3UI.append(this.mjs.item3);
            item3UI.index = n;
        }
        // append Item4 UI
        for (let n = 0; n < 4; n++) {
            const item4UI = UI_1.UI.append(this.mjs.item4, "page7/item4");
            item4UI.mjs.message.text = "Item4 Message " + n + " ....";
        }
        this.vdos.dialog1.onClick = () => {
            // "Open Dialog1" buton clicked...
            const test1 = Dialog_1.Dialog.show("test");
            console.log(test1);
            test1.vdos.close.onClick = () => {
                test1.close();
            };
        };
        this.vdos.dialog2.onClick = () => {
            // "Open Dialog2" buton clicked...
            const test1 = TestDialog_1.TestDialog.show();
            console.log(test1);
        };
    }
}
exports.Page7View = Page7View;
