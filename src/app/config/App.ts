import { App, AppRouteType, Routes } from "App";

export class MyApp extends App {

    public static routeType: AppRouteType = AppRouteType.application;

    public static routes: Routes = {
        "/": "home",
        "/page1": "page1",
        "/page2": "page2",
        "/page3": {
            "/" : "page3/list",
            "/{id}" : "page3/detail",
        },
        "/page4": "page4",
    };
}