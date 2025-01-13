"use strict";
const { Mikeneko, BuildPlatformType } = require("mikeneko");
Mikeneko.build({
//    corelibtsc: true,
    platforms: [
        {
            name: "app",
            debug: true,
            mapping: true,
        },
        {
            name: "web",
            debug: true,
        },
        {
            name: "webpack",
            build: "webpack",
            debug: true,
        },
    ],
});
