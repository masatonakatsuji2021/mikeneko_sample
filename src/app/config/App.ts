import { App, AppRouteType } from "App";
import { RouteMaps } from "RouteMap";
import { Maps } from "app/config/Maps";
import { RouteType } from "app/config/Config";

/**
 * ***App Initial Setup***
 */
export class MyApp extends App {

    // routeType
    public static routeType: AppRouteType = RouteType;
    
    public static maps : RouteMaps = Maps;

    // Not Found View
    public static notFoundView: string = "notFound";

    // Rendring Delay 
    public static delay: number = 200;

    // Animation Open Class Name
    public static animationOpenClassName: string = "open";

    // Animation Close Class Name
    public static animationCloseClassName: string = "close";
}
