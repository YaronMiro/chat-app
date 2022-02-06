class Validator {

    constructor(validator) {
        this.validatorService = validator;
    }

    validate(value, schema) {
        const validationError = this.validatorService.validate(value, schema);
        return validationError ? validationError : true;
    }
}

module.exports = Validator;