class ValidatorRouter {

    constructor(validator) {
        this.validatorService = validator;
        this.schema = {};
    }

    setSchema(schema){
        this.schema = schema;
    }

    validate(value){
        this.validatorService.validate(value, this.schema)
    }

}

module.exports = ValidatorRouter;