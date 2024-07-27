"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
const Controller_1 = require("Controller");
const Special_1 = require("app/Special");
const Response_1 = require("Response");
class MainController extends Controller_1.Controller {
    constructor() {
        super(...arguments);
        this.template = "default";
        this.head = "head";
    }
    handleBefore(beginStatus) {
        console.log("Main Controller Before .... OK");
    }
    handleAfter(beginStatus) {
        console.log("Main Controller After .... OK");
    }
    handleRenderBefore(beginStatus) {
        console.log(this.mjs);
        this.mjs.backbtn.onClick = () => {
            Response_1.Response.back();
        };
    }
    index() {
        console.log(Special_1.Special.run());
        console.log("Main Controller Index ...OK");
    }
    page1() {
        this.mjs.button1.onClick = () => {
            alert("Page1 Click ... OK");
        };
    }
}
exports.MainController = MainController;
