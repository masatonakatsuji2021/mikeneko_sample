import { App, AppRouteType, Routes } from "App";
import { MyRoutes } from "app/config/Routes";

/**
 * ***App Initial Setup***
 */
export class MyApp extends App {

    // routeType
    public static routeType: AppRouteType = AppRouteType.web;

    // routes
    public static routes: Routes = MyRoutes;

    public static notFoundView: string = "notFound";

    public static delay: number = 200;

    public static animationOpenClassName: string = "open";

    public static animationCloseClassName: string = "close";
}