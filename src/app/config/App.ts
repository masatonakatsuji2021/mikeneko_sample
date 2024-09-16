import { App, AppRouteType, Routes } from "App";
import { MyRoutes } from "app/config/Routes";

export class MyApp extends App {

    // routeType
    public static routeType: AppRouteType = AppRouteType.application;

    // routes
    public static routes: Routes = MyRoutes;
}