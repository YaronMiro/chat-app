const express = require("express");
const dotenv = require("dotenv");
const App = require("./App");
const Router = require("../controllers/Router");
const AuthRouter = require("../controllers/v1/AuthRouter");

dotenv.config();

const Bottle = require("bottlejs");
const IOC = new Bottle();

IOC.constant('AppPort', process.env.PORT || 5000);

IOC.factory('App', function (container) {
    const port = container.AppPort;
    return new App(express(), port);
});

IOC.instanceFactory('Router', function (container) {
    return new Router(express.Router());
});

IOC.factory('AuthRouter', function(container) {    
    return new AuthRouter(container.Router.instance(), '/auth');
});

module.exports = { IOC }