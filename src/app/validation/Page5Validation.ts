import { ValidateRuleMaps, ValidateRule, Validation } from "Validation";

export class Page5Validation extends Validation {

    public rules: ValidateRuleMaps = {
        input1: [
            {
                rule: ValidateRule.required,
                message: "未入力です",
            },
        ],
        input2: [
            {
                rule: ValidateRule.length,
                args: [ 4 ],
                message: "4文字で入力してください",
            },
        ],
        input3: [
            {
                rule: ValidateRule.lengthMin,
                args: [ 4 ],
                message: "4文字以上で入力してください",
            },
        ],
        input4: [
            {
                rule: ValidateRule.lengthMax,
                args: [ 4 ],
                message: "4文字以下で入力してください",
            },
        ],
        input5: [
            {
                rule: ValidateRule.lengthBetween,
                args: [ 4, 12 ],
                message: "4 - 12文字の範囲で入力してください",
            },
        ],
    };

}