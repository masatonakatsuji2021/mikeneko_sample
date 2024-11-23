"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type1View = void 0;
const Lib_1 = require("Lib");
const View_1 = require("app/view/View");
class Type1View extends View_1.View {
    handle() {
        this.title = "Page1 (Type1)";
        this.vdos.throwBtn.onClick = () => {
            throw Error("ERROR TEST!");
        };
        this.setDateTime();
        this.stt = setInterval(() => {
            this.setDateTime();
        }, 250);
    }
    setDateTime() {
        this.vdos.datetime.text = Lib_1.Lib.datetime().format("YYYY/MM/DD HH:II:SS");
    }
    handleLeave() {
        clearInterval(this.stt);
    }
}
exports.Type1View = Type1View;
