"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type1View = void 0;
const Response_1 = require("Response");
const Lib_1 = require("Lib");
const View_1 = require("app/view/View");
const Routes_1 = require("app/config/Routes");
class Type1View extends View_1.View {
    handleAlways() {
        this.title = "Page1 (Type1)";
    }
    handle() {
        this.vdos.throwBtn.onClick = () => {
            throw Error("ERROR TEST!");
        };
        this.vdos.selectMenuBtn.onClick = () => __awaiter(this, void 0, void 0, function* () {
            const value = yield Response_1.Response.next(Routes_1.RURL.SelectMenu, this.selectValue);
            this.selectValue = value;
            if (value == undefined) {
                this.vdos.selectValue.text = "";
            }
            else {
                this.vdos.selectValue.text = "(" + value + ")";
            }
        });
        // When you press the type2 button
        this.vdos.type2Btn.onClick = () => {
            // move to Type2
            Response_1.Response.next(Routes_1.RURL.Page1.Type2);
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
