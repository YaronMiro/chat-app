class Validator {

    constructor(validator) {
        this.validatorService = validator;
    }

    validate(value, schema) {
            const isValid =  this.validatorService.validate(value, schema);
            return true;
    }
}

module.exports = Validator;