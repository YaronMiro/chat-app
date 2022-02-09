const Validator = require("./Validator")
class ValidatorController extends Validator {

    constructor(validator) {
        super(validator)
        this.setSchema({
            presence: { message: "^basePath is required" },
            type: "string",
            format: {
                pattern: "^\/[0-9a-z-/]+$",
                flags: "i",
                message: "^basePath must start with a slash ,and can only contain [a-z] and [0-9] and [-/]"
            }
        })
    }
}

module.exports = ValidatorController;