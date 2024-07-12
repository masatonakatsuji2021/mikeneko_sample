"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const saiberian_1 = require("saiberian");
saiberian_1.Saiberian.build({
    platforms: [
        { type: "web" },
        { type: "android" }
    ],
    codeCompress: false,
});
