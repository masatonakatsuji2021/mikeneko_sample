import { Validation, ValidateRuleMaps, ValidateRule } from "Validation";

export class Page5Validation extends Validation {

    public rules : ValidateRuleMaps = {
        name : [
            {
                rule: ValidateRule.required,
                message: "未入力です",
            },
            {
                rule: ValidateRule.lengthMin,
                args: [ 10 ],
                message: "10文字以上を入力して",
            },
        ],
        code : [
            {
                rule: ValidateRule.required,
                message: "未入力です",
            },
            {
                rule: ValidateRule.lengthBetween,
                args: [ 20, 50 ],
                message: "20〜50文字以内で入力して",
            },
        ],
    }
}