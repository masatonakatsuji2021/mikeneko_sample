import { App, AppRouteType, Routes } from "App";
import { MyRoutes } from "app/config/Routes";

/**
 * ***App Initial Setup***
 */
export class MyApp extends App {

    // routeType
    public static routeType: AppRouteType = AppRouteType.application;

    // routes
    public static routes: Routes = MyRoutes;

    // Not Found View
    public static notFoundView: string = "notFound";

    // Rendring Delay 
    public static delay: number = 200;

    // Animation Open Class Name
    public static animationOpenClassName: string = "open";

    // Animation Close Class Name
    public static animationCloseClassName: string = "close";
}