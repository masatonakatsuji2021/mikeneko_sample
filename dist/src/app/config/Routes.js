"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoutes = void 0;
exports.MyRoutes = {
    "/": "home",
    "/page1": "page1",
    "/page2": "page2",
    "/page3": {
        "/": "page3/list",
        "/{id}": "page3/detail",
    },
    "/page4": "page4",
    "/page5": "page5",
};
