"use strict";
const { Builder } = require("mikeneko-build");
Builder.build({
    /*
    plugins: [
        "mikeneko-testlibrary",
    ],
    */
    platforms: [
        {
            name: "app",
            debug: true,
            mapping: true,
        },
        {
            name: "web",
            debug: true,
            mapping: true,
        },
        {
            name: "webpack",
            build: "webpack",
            debug: true,
        },
    ],
});
