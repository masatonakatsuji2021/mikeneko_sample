"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildHandle = void 0;
const saiberian_1 = require("saiberian");
class BuildHandle extends saiberian_1.BuildHandle {
    static handleBegin(platform) {
        console.log("+++++++ Handle Begin ..... OK ++++++++++++++++++++");
        console.log(platform);
    }
    static handleComplete(platform) {
        console.log("+++++++ Handle Complete ..... OK ++++++++++++++++++++");
        console.log(platform);
    }
}
exports.BuildHandle = BuildHandle;
