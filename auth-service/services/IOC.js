const express = require("express");
const validateJs = require("validate.js");
const dotenv = require("dotenv");
const App = require("./App");
const Router = require("./Router");
const FactoryController = require("../controllers/FactoryController");
const AuthController = require("../controllers/v1/AuthController");
const Validator = require("./Validator");

dotenv.config();

const Bottle = require("bottlejs");
const IOC = new Bottle();

IOC.constant('AppPort', process.env.PORT || 5000);

IOC.factory('App', function (container) {
    const port = container.AppPort;
    return new App(express(), port);
});

IOC.factory('AuthController', function(container) {    
    return FactoryController(container.Router.instance(), '/auth', AuthController);
});

IOC.instanceFactory('Validator', function (_) {
    return new Validator(validateJs);
});

IOC.instanceFactory('Router', function (container) {
    return new Router(express.Router(), container.Validator.instance());
});


module.exports = { IOC }