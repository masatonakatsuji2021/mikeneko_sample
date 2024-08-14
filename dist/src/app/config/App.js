"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyApp = void 0;
const App_1 = require("App");
class MyApp extends App_1.App {
}
exports.MyApp = MyApp;
MyApp.routeType = App_1.AppRouteType.application;
MyApp.routes = {
    "/": "home",
    "/page1": "page1",
    "/page2": "page2",
    "/page3": {
        "/": "page3/list",
        "/{id}": "page3/detail",
    },
};
