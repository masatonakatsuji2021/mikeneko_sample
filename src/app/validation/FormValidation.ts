import { ValidateRuleMaps, ValidateRule, Validation } from "Validation";

export class FormValidation extends Validation {

    public rules: ValidateRuleMaps = {
        name: [
            {
                rule: ValidateRule.required,
                message: "Not entered.",
            },
            {
                rule: ValidateRule.lengthBetween,
                args: [ 4, 15 ],
                message: "The input is not within the range of 4-15 characters.",
            },
        ],
        username: [
            {
                rule: ValidateRule.required,
                message: "Not entered.",
            },
            {
                rule: ValidateRule.alphaNumeric,
                message: "Enter only half-width alphanumeric characters.",
            },
            {
                rule: ValidateRule.lengthMax,
                args: [ 16 ],
                message: "Enter 16 under characters.",
            },
        ],
        numberic: [
            {
                rule: ValidateRule.numeric,
                message: "Enter only half-width numbers.",
            },
            {
                rule: ValidateRule.lengthMax,
                args: [ 16 ],
                message: "Enter 16 under characters.",
            },
        ],
    };

}