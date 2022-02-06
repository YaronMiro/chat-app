class Validator {

    constructor(validator) {
        this._validator = validator;
        this.schema = {};
    }

    addValidationType(name, handler){
        this._validator.validators[name] = handler;
    }

    validate(value) {
        const validationError = this._validator.validate(value, this.schema);
        return validationError ? validationError : true;
    }

    setSchema(schema){
        this.schema = schema;
    }
}

module.exports = Validator;