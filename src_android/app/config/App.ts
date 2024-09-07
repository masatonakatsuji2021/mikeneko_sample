import { App, AppRouteType, Routes } from "App";
import { MyRoutes } from "app/config/Routes";

export class MyApp extends App {

    public static routeType: AppRouteType = AppRouteType.application;

    public static routes: Routes = MyRoutes;
}