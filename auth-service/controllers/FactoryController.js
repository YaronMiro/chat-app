class FactoryController {

    constructor(router, validator) {
        this.router = router;
        this.validator = validator;

        this.validator.setSchema({
            presence: { message: "^basePath is required" },
            format: {
                pattern: "^\/[0-9a-z-/]+$",
                flags: "i",
                message: "^basePath must be prefixed with a slash"
            }
        })
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