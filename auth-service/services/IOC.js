const express = require("express");
const validateJs = require("validate.js");
const dotenv = require("dotenv");
const App = require("./App");
const Router = require("../controllers/Router");
const AuthRouter = require("../controllers/v1/AuthRouter");
const Validator = require("./Validator");

dotenv.config();

const Bottle = require("bottlejs");
const IOC = new Bottle();

IOC.constant('AppPort', process.env.PORT || 5000);

IOC.factory('App', function (container) {
    const port = container.AppPort;
    return new App(express(), port);
});

IOC.factory('AuthRouter', function(container) {    
    return new AuthRouter(container.Router.instance(), '/auth');
});

IOC.instanceFactory('Validator', function (_) {
    return new Validator(validateJs);
});

IOC.instanceFactory('Router', function (container) {
    return new Router(express.Router(), container.Validator.instance());
});


module.exports = { IOC }