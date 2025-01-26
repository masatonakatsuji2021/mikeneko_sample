import { RMap, RouteMap } from "RouteMap";

export const MyRouteMaps = {

    /** Home */
    home: RMap("home"),

    /** Sample Page1 */
    page1: RMap("page1"),

    /** Sample Page2 */
    page2: RMap("page2"),

    /** Sample Page3 */
    page3: {

        /** Sample Page3 List */
        list: RMap("page3/page3List"),

        /** Sample Page3 Detail */
        detail: RMap({ url: "/page3/{id}", view: "page3/page3Detail" }),
    },

    /** Form Page */
    form: {

        /** Form Page (Main)*/
        main: RMap("form/formMain"),

        /** Form Select Page */
        select: RMap("form/formSelect"),
    },

    /** Dialog Page */
    dialog: RMap("dialog"),

    /** FreePage */
    freePage: RMap("freePage"),

    fn1: RMap({ handle: (url: string) : RouteMap =>{        
        console.log({url});
        return RMap("fn1");
    }}),
};
