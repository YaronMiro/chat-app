
class ValidatorRouter {

    constructor(validatorService) {
        this.validatorService = validatorService;
        this.validatorService.addValidationType('routeHandler', this.routeHandlerValidation);
        return this.validatorService;
    }

    routeHandlerValidation(value, options, key, attributes) {
        value === "stuff";
    }
}

module.exports = ValidatorRouter;