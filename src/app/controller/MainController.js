"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
var Dom_1 = require("Dom");
var Controller_1 = require("Controller");
var Special_1 = require("app/Special");
var MainController = /** @class */ (function (_super) {
    __extends(MainController, _super);
    function MainController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.template = "default";
        _this.head = "head";
        return _this;
    }
    MainController.prototype.handleBefore = function (beginStatus) {
        console.log("Main Controller Before .... OK");
    };
    MainController.prototype.handleAfter = function (beginStatus) {
        console.log("Main Controller After .... OK");
    };
    MainController.prototype.index = function () {
        console.log(Special_1.Special.run());
        console.log("Main Controller Index ...OK");
    };
    MainController.prototype.page1 = function () {
        var a = (0, Dom_1.VDom)("button1");
        a.on("click", function () {
            alert("Page1 Click ... OK");
        });
    };
    return MainController;
}(Controller_1.Controller));
exports.MainController = MainController;
