const express = require("express");
const ConfigService = require("./ConfigService");
const Router = require("../routes/v1/Router");

class App {
    constructor(app, configService, routes) {
        this.port = process.env.PORT || 5000;
        this.app = app;
        new configService(app);
        new routes(app);
        this.run();
        return this.app;
    }

    run(){
        this.app.listen(this.port, () =>
            console.log(`Server is running on port http://localhost:${this.port}`)
        );
    }
}

const app = new App(express(), ConfigService, Router);
module.exports = app

