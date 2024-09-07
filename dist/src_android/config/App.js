"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyApp = void 0;
const App_1 = require("App");
const Routes_1 = require("app/config/Routes");
class MyApp extends App_1.App {
}
exports.MyApp = MyApp;
MyApp.routeType = App_1.AppRouteType.application;
MyApp.routes = Routes_1.MyRoutes;
