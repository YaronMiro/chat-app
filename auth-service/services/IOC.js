const express = require("express");
const dotenv = require("dotenv");
const App = require("./App");
const AuthRouter = require("../routes/v1/AuthRouter");

dotenv.config();

const Bottle = require("bottlejs");
const DI = new Bottle();

DI.constant('AppPort', process.env.PORT || 5000);

DI.factory('App', function(container) {
    const port = container.AppPort;
    return new App(express(), port);
});

DI.factory('AuthRouter', function(container) {
    return new AuthRouter(express.Router(), '/auth');
});

module.exports = { DI }