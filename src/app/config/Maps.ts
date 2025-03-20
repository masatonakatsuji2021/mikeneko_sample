import { RMap, RouteMap } from "RouteMap";
import { DialogView } from "app/view/DialogView";
import { Fn1View } from "app/view/Fn1View";
import { FreePageView } from "app/view/FreePageView";
import { HomeView } from "app/view/HomeView";
import { NotFoundView } from "app/view/NotFoundView";
import { Page1View } from "app/view/Page1View";
import { Page2View } from "app/view/Page2View";
import { UitestView } from "app/view/UitestView";
import { FormMainView } from "app/view/form/FormMainView";
import { FormResultView } from "app/view/form/FormResultView";
import { FormSelectView } from "app/view/form/FormSelectView";
import { Page3DetailView } from "app/view/page3/Page3DetailView";
import { Page3ListView } from "app/view/page3/Page3ListView";

export const Maps = {

    /** Home */
    home: HomeView,

    /** Sample Page1 */
    page1: Page1View,

    /** Sample Page2 */
    page2: Page2View,

    /** Sample Page3 */
    page3: {

        /** Sample Page3 List */
        list: Page3ListView,

        /** Sample Page3 Detail */
        detail: RMap({ url: "/page3/{id}", view: Page3DetailView }),
    },

    /** Form Page */
    form: {

        /** Form Page (Main)*/
        main: FormMainView,

        /** Form Select Page */
        select: FormSelectView,

        /** Form Result Page */
        result: FormResultView,
    },

    /** UITest Page */
    uitest: UitestView,
    
    /** Dialog Page */
    dialog: DialogView,

    /** FreePage */
    freePage: FreePageView,

    fn1: RMap({ handle: (url: string) : RouteMap =>{        
        console.log({url});
        return RMap(Fn1View);
    }}),

    /** Not Found Page */
    notFound: NotFoundView,
};