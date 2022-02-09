
const Validator = require("../../services/Validator");
const validateJs = require("validate.js");


describe('Testing Validator Class', () => {

       // Initialize our Router before each test.
       let validator;
       beforeEach( () => validator = new Validator(validateJs) );

    test('Adding a custom validation type', () => {
        // Define the custom type on the validator.
        const customTypeHandler = (value) => value.startsWith('Test');
        const customTypeName = 'test';
        validator.addValidationType(customTypeName, customTypeHandler);

        // Set the validator schema.
        validator.setSchema({
            someField: {
                type: customTypeName
            }
        });

        // Case where we have a valid value.
        const validValue = { someField: "Test sample text" };
        expect(validator.validate(validValue)).not.toBeDefined();

        // Case where we an un-valid value.
        const unValidValue = { someField: 'sample text' };
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

        const targetFieldName = 'someField'
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