export const MyRoutes = {
    "/": "home",
    "/page1": "page1",
    "/page2": "page2",
    "/page3": {
        "/" : "page3/list",
        "/{id}" : "page3/detail",
    },
    "/page4": "page4",
    "/page5": "page5",
};