const express = require("express");
const validateJs = require("validate.js");
const dotenv = require("dotenv");
const App = require("./App");
const Router = require("./Router");
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
    return new AuthController(container.Router.instance(), '/auth');
});

IOC.instanceFactory('Validator', function (_) {
    return new Validator(validateJs);
});

IOC.instanceFactory('Router', function (container) {
    return new Router(express.Router(), container.Validator.instance());
});


module.exports = { IOC }