/**
 * Routing for each screen
 */

/** Route URL List */
export const RURL= {

    /** Home (Top Page) */
    Home: "/",

    /** Page1 */
    Page1: {

        /** Page1 Top */
        Top: "/page1",

        /** Page1 Type1 */
        Type1: "/page1/type1",

        /** Page1 Type2 */
        Type2: "/page1/type2",
    },

    /** Page2 */
    Page2: {

        /** Page2 Top */
        Top: "/page2",

        /** Page2 Detail */
        Detail: "/page2/{id}",

        /** Get Page2 Detail URL (on id aregment) */
        getDetail: (id) => {
            return RURL.Page2.Top + "/" + id;
        },
    },

    /** Page3 */
    Page3: "/page3",

    /** Page4 */
    Page4: {

        /** Page4 Top */
        Top: "/page4",

        /** Page4 Detail */
        Detail: "/page4/{id}",

        /** Get Page4 Detail URL (on id aregment) */
        getDetail: (id) => {
            return RURL.Page4.Top + "/" + id;
        },
    },

    /** Page5 */
    Page5: "/page5",

    /** Page6 */
    Page6: "/page6",

    /** Page7 */
    Page7: "/page7",

    /** arekore (not found page) */
    Arekore: "/arekore",

    /** Select menu */
    SelectMenu: "/selectMenu",
};

export const MyRoutes = {
    [RURL.Home]: "home",
    [RURL.Page1.Top]: "page1",
    [RURL.Page1.Type1]: "page1/type1",
    [RURL.Page1.Type2]: "page1/type2",
    [RURL.Page2.Top]: "page2",
    [RURL.Page2.Detail] : "page2/detail",
    [RURL.Page3]: "page3",
    [RURL.Page4.Top]: "page4",
    [RURL.Page4.Detail]: "page4/detail",
    [RURL.Page5]: "page5",
    [RURL.Page6]: "page6",
    [RURL.Page7]: "page7",
    [RURL.SelectMenu]: "selectMenu",
};