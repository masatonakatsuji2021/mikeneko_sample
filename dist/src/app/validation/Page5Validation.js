"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page5Validation = void 0;
const Validation_1 = require("Validation");
class Page5Validation extends Validation_1.Validation {
    constructor() {
        super(...arguments);
        this.rules = {
            name: [
                {
                    rule: Validation_1.ValidateRule.required,
                    message: "未入力です",
                },
                {
                    rule: Validation_1.ValidateRule.lengthMin,
                    args: [10],
                    message: "10文字以上を入力して",
                },
            ],
            code: [
                {
                    rule: Validation_1.ValidateRule.required,
                    message: "未入力です",
                },
                {
                    rule: Validation_1.ValidateRule.lengthBetween,
                    args: [20, 50],
                    message: "20〜50文字以内で入力して",
                },
            ],
        };
    }
}
exports.Page5Validation = Page5Validation;
