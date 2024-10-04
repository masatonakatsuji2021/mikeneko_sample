/**
 * Routing for each screen
 */
export const MyRoutes = {
    "/": "home",                        // Home
    "/page1": {
        "/": "page1",
        "/type1": "page1/type1",
    },
    "/page2": {
        "/": "page2",
        "/{id}": "page2/detail",
    },
    "/page3": "page3",
    "/page4": {
        "/": "page4",
        "/{id}": "page4/detail",
    },
    "/page5": "page5",
    "/page6": "page6",
    "/page7": "page7",
};