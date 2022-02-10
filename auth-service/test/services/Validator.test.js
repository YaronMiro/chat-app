
const Validator = require("../../services/Validator");
const validateJs = require("validate.js");


describe('Testing Validator Class', () => {



       // Initialize our Router before each test.
       let validator;
       const targetFieldName = 'someField'
       beforeEach( () => validator = new Validator(validateJs) );

    test('Adding a custom validation type', () => {
        // Define the custom type on the validator.
        const customTypeHandler = (value) => value.startsWith('Test');
        const customTypeName = 'test';
        validator.addValidationType(customTypeName, customTypeHandler);

        // Set the validator schema.
        validator.setSchema({
            [targetFieldName]: {
                type: customTypeName
            }
        });

        // Case where we have a valid value.
        const validValue = { [targetFieldName]: "Test sample text" };
        expect(validator.validate(validValue)).not.toBeDefined();

        // Case where we an un-valid value.
        const unValidValue = { [targetFieldName]: 'sample text' };
        const validationError = validator.validate(unValidValue);
        expect(validationError).toBeDefined();
    });



    test('validation type "function"', () => {
        class TestClass {};
        // Set the validator schema.
        validator.setSchema({
            [targetFieldName]: {
                type: "function"
            }
        });

        // Case where we have a valid value.
        const validValue = { [targetFieldName]: () => {} };
        expect(validator.validate(validValue)).not.toBeDefined();

        // Case where we an un-valid value.
        const unValidValue = { [targetFieldName]: "must be a function" };
        const validationError = validator.validate(unValidValue);
        expect(validationError).toBeDefined();
    });



    test('validation "instanceOf"', () => {
        class TestClass {};
        // Set the validator schema.
        validator.setSchema({
            [targetFieldName]: {
                instanceOf: {
                    getType: () => TestClass
                }
            }
        });

        // Case where we have a valid value.
        const validValue = { [targetFieldName]: new TestClass() };
        expect(validator.validate(validValue)).not.toBeDefined();

        // Case where we an un-valid value.
        const unValidValue = { [targetFieldName]: new Date() };
        const validationError = validator.validate(unValidValue);
        expect(validationError).toBeDefined();
    });



    
    test('validation "arrayOf" type "string"', () => {
        // Set the validator schema.
        validator.setSchema({
            [targetFieldName]: {
                arrayOf: {
                    type: "string"
                }
            }
        });

        // Case where we have a valid value.
        const validValue = { [targetFieldName]: [ "string 1", "string 2" ] };
        expect(validator.validate(validValue)).not.toBeDefined();

        // Case where we an un-valid value.
        const unValidValue = { [targetFieldName]: [ 1, 2 ] };
        const validationError = validator.validate(unValidValue);
        expect(validationError).toBeDefined();
    });



    test('validation "arrayOf" type "number"', () => {
        // Set the validator schema.
        validator.setSchema({
            [targetFieldName]: {
                arrayOf: {
                    type: "number"
                }
            }
        });

        // Case where we have a valid value.
        const validValue = { [targetFieldName]: [ 1, 2 ] };
        expect(validator.validate(validValue)).not.toBeDefined();

        // Case where we an un-valid value.
        const unValidValue = { [targetFieldName]: [ "string 1", "string 2" ] };
        const validationError = validator.validate(unValidValue);
        expect(validationError).toBeDefined();
    });



    test('validation "arrayOf" type "object"', () => {
        // Set the validator schema.
        validator.setSchema({
            [targetFieldName]: {
                arrayOf: {
                    type: "object"
                }
            }
        });

        // Case where we have a valid value.
        const validValue = { [targetFieldName]: [ new Object(), new Object() ] };
        expect(validator.validate(validValue)).not.toBeDefined();

        // Case where we an un-valid value.
        const unValidValue = { [targetFieldName]: [ "string 1", "string 2" ] };
        const validationError = validator.validate(unValidValue);
        expect(validationError).toBeDefined();
    });



    test('validation "arrayOf" type "function"', () => {
        // Set the validator schema.
        validator.setSchema({
            [targetFieldName]: {
                arrayOf: {
                    type: "function"
                }
            }
        });

        // Case where we have a valid value.
        const validValue = { [targetFieldName]: [ () => {}, () => {} ] };
        expect(validator.validate(validValue)).not.toBeDefined();

        // Case where we an un-valid value.
        const unValidValue = { [targetFieldName]: [ "string 1", "string 2" ] };
        const validationError = validator.validate(unValidValue);
        expect(validationError).toBeDefined();
    });


    test('validation "arrayOf" invalid type', () => {
        // Set the validator schema.
        validator.setSchema({
            [targetFieldName]: {
                arrayOf: {
                    type: "unknownType"
                }
            }
        });

        // Case where we an un-valid value.
        const unValidValue = { [targetFieldName]: [ "string 1", "string 2" ] };
        const validationError = validator.validate(unValidValue);
        expect(validationError).toBeDefined();
    });



    test('validation "arrayOf" not an Array', () => {
        // Set the validator schema.
        validator.setSchema({
            [targetFieldName]: {
                arrayOf: {
                    type: "string"
                }
            }
        });

        // Case where we an un-valid value.
        const unValidValue = { [targetFieldName]: "string 1, string 2" };
        const validationError = validator.validate(unValidValue);
        expect(validationError).toBeDefined();
    });



    test('Adding a custom validation', () => {
        
        // Define the custom type on the validator.
        const customValidationName = 'arrayOfObjects';
        const validationErrorMessage = 'Array must only contain objects';
        const customValidationHandler = (items = [], options, key, attributes) => {
            isValid = items.every(item => item instanceof Object);
            return isValid ? undefined : `^${validationErrorMessage}`  
        };

        validator.addValidation(customValidationName, customValidationHandler);

        // Set the validator schema.
        validator.setSchema({
            [targetFieldName]: {
                [customValidationName]: {}
            }
        });

        // Case where we have a valid value.
        const validValue = {
            [targetFieldName]: [
                new Object(),
                new Object()
            ]
        };
        expect(validator.validate(validValue)).not.toBeDefined();

        // Case where we an un-valid value not an Array.
        const unValidValue = {
            [targetFieldName]: [
                'some text 1',
                'some text 2'
            ]
        };
        const validationError = validator.validate(unValidValue);
        expect(validationError[targetFieldName].pop()).toEqual(validationErrorMessage);
    });

});