class FactoryController {

    constructor(router, controllerValidator) {
        this.router = router;
        this.validator = controllerValidator;
    }

    createInstance(basePath, controllerClass) {
        const validationError = this.validator.single(basePath);

        if (validationError) {
            // @todo[LOGGER]
            console.log(validationError);
        }

        return validationError ? null : new controllerClass(this.router, basePath);
    }
}

module.exports = FactoryController;