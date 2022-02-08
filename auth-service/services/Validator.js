class Validator {

    constructor(validator) {
        this._validator = validator;
        this.addValidationType('function', this.validationTypeFunctionHandler);
        this.addValidation('arrayOf', this.validationArrayOfHandler);
        this.schema = {};
    }

    validationTypeFunctionHandler = (value) => this._validator.isFunction(value)

    validationArrayOfHandler = (items = [], options, key, attributes) => {
        const  {
            isString,
            isNumber, 
            isObject, 
            isFunction, 
            isArray,
        } = this._validator

        if (!isArray(items)) {
            return 'Must be of type Array'
        }
        
        const { type } = options;
        let message = undefined;
        let error = false;

        for (const item of items) {
            switch (type) {
                case "string":
                    if (!isString(item)) error = true;
                    break;
                case "number":
                    if (!isNumber(item)) error = true;
                    break;
                case "object":
                    if (!isObject(item)) error = true;
                    break;
                case "function":
                    if (!isFunction(item)) error = true;
                    break;
                default:
                    message = `^${key} "${type}" is not a valid type`;
                    break;
            };

             // Exit early once we find an invalid type.
             if (error) {
                break;
            }
        }

        
        if (error) {
            message = `^${key} should be an Array of ${type} type`;
        }

        return message;
    }

    addValidationType(name, handler){
        this._validator.validators.type.types[name] = handler;
    }

    addValidation(name, handler){
        this._validator.validators[name] = handler;
    }

    validate(value) {
        return this._validator.validate(value, this.schema)
    }

    single(value) {
        return this._validator.single(value, this.schema)
    }

    setSchema(schema){
        this.schema = schema;
    }
}

module.exports = Validator;