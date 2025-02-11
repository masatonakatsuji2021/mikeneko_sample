import { App, AppRouteType } from "App";
import { RouteMap, RouteMaps } from "RouteMap";
import { Maps } from "app/config/Maps";
import { RouteType } from "app/config/Config";

/**
 * ***App Initial Setup***
 */
export class MyApp extends App {

    // routeType
    public static routeType: AppRouteType = RouteType;
    
    // route maps
    public static maps : RouteMaps = Maps;

    // Not Found View
    public static notFoundView: RouteMap = Maps.notFound;

    // Rendring Delay 
    public static delay: number = 300;

    // Animation Open Class Name
    public static animationOpenClassName: string = "open";

    // Animation Close Class Name
    public static animationCloseClassName: string = "close";
}
