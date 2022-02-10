const express = require("express");
const validateJs = require("validate.js");
const dotenv = require("dotenv");
const App = require("./App");
const { Router } = require("./Router");
const FactoryController = require("../services/FactoryController");
const AuthController = require("../controllers/v1/AuthController");
const ValidatorRouter = require("./ValidatorRouter");
const ValidatorController = require("./ValidatorController");

dotenv.config();

const Bottle = require("bottlejs");
const IOC = new Bottle();

IOC.constant('AppPort', process.env.PORT || 5000);

IOC.factory('App', function (container) {
    const port = container.AppPort;
    return new App(express(), port);
});

IOC.factory('FactoryController', function(container) {    
    return new FactoryController(container.Router.instance(), container.ValidatorController);
});

IOC.factory('AuthController', function(container) {    
    return container.FactoryController.createInstance('/auth', AuthController);
});

IOC.factory('ValidatorController', function (_) {
    return new ValidatorController(validateJs);
});

IOC.factory('ValidatorRouter', function (_) {
    return new ValidatorRouter(validateJs);
});

IOC.instanceFactory('Router', function (container) {
    return new Router(express.Router(), container.ValidatorRouter);
});

module.exports = { IOC }