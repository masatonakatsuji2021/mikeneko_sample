/**
 * Routing for each screen
 */

/** Route URL List */
export const RURL= {

    /** Home (Top Page) */
    Home: "/",

    /** Page1 */
    Page1: "/page1",

    /** Page2 */
    Page2: "/page2",

    /** list page */
    List: "/list",

    /** List Detail page */
    ListDetail: "/list/{id}", 

    /** Form page */
    Form: "/form",

    /** Form Select page */
    FormSelect: "/formSelect",

    /** Dialog page */
    Dialog: "/dialog",

    /** Free Page */
    freePage: "/freePage",
};

export const MyRoutes = {
    [RURL.Home]: "home",
    [RURL.Page1]: "page1",
    [RURL.Page2]: "page2",
    [RURL.List]: "list",
    [RURL.ListDetail]: "listDetail",
    [RURL.Form]: "form",
    [RURL.FormSelect]: "formSelect",
    [RURL.Dialog]: "dialog",
    [RURL.freePage]: "freePage",
};