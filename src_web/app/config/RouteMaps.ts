import { RMap, RouteMap } from "RouteMap";

export const MyRouteMaps = {

    /** Home */
    home: RMap({url: "/", view: "home" }),

    /** Sample Page1 */
    page1: RMap({ url: "/page1", view: "page1" }),

    /** Sample Page2 */
    page2: RMap({ url: "/page2", view: "page2" }),

    /** Sample Page3 */
    page3: {

        /** Sample Page3 List */
        list: RMap({ url: "/page3", view: "page3/page3List" }),

        /** Sample Page3 Detail */
        detail: RMap({ url: "/page3/{id}", view: "page3/page3Detail" }),
    },

    /** Form Page */
    form: {

        /** Form Page (Main)*/
        main: RMap({ url: "/form", view: "form/formMain" }),

        /** Form Select Page */
        select: RMap({ url: "/form/select", view: "form/formSelect" }),
    },

    /** Dialog Page */
    dialog: RMap({ url: "/dialog", view: "dialog" }),

    /** FreePage */
    freePage: RMap({ url: "/freePage", view: "freePage" }),

    fn1: RMap({ url: "/fn1", handle: (url: string) : RouteMap =>{        
        console.log({url});
        return RMap("fn1");
    }}),
};