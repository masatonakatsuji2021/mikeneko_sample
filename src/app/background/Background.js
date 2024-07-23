"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Background = void 0;
const Background_1 = require("Background");
const Dom_1 = require("Dom");
const Response_1 = require("Response");
class Background extends Background_1.Background {
    handle() {
        console.log("Background ....... ok");
        setTimeout(() => {
            (0, Dom_1.Dom)(".backbtn").onClick = () => {
                Response_1.Response.back();
            };
        }, 1000);
    }
}
exports.Background = Background;
