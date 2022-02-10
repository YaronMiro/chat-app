const Validator = require("./Validator")
const { METHODS  } = require("../services/Router");

class ValidatorRouter extends Validator {
    constructor(validator) {
        super(validator)
        this.setSchema({
            path: {
              presence: { message: "^Rout path is required" },
              type: "string",
              format: {
                pattern: "^\/[0-9a-z-/]+$",
                flags: "i",
                message: "Must start with a slash, and can only contain [a-z] and [0-9] and [-/]"
              }
            },
            method: {
              presence: { message: "^Rout request method is required" },
              inclusion: {
                within: METHODS,
                message: "\"%{value}\" is not a valid request method"
              }
            },
            handler: {
              presence: { message: "^Rout handler function is required" },
              type: "function"
            },
            localMiddleware: {
              arrayOf: {
                type: "function"
              }
            }
        });
    }

}

module.exports = ValidatorRouter;