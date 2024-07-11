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
exports.MyApp = void 0;
var App_1 = require("App");
var MyApp = /** @class */ (function (_super) {
    __extends(MyApp, _super);
    function MyApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyApp.routes = {
        "/": "c:main, a:index",
        "/page1": "c:main, a:page1",
        "/page2/{id}": "c:main, a:page2",
        "/page3/{id1}/{id2?": "c:main, a:page3",
        "/page4/{?id}": "c:main, a:page4",
        "/view_test": "viewTest",
    };
    return MyApp;
}(App_1.App));
exports.MyApp = MyApp;
