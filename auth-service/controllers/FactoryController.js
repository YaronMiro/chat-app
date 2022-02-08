class FactoryController {

    constructor(router, validator) {
        this.router = router;
        this.validator = validator;

        this.validator.setSchema({
            presence: { message: "^basePath is required" },
            type: "string",
            format: {
                pattern: "^\/[0-9a-z-/]+$",
                flags: "i",
                message: "^basePath must start with a slash ,and can only contain [a-z] and [0-9] and [-/]"
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