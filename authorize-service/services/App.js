const express = require("express");
const configService = require("./ConfigService");
const routes = require("../routes/v1/");

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

const app = new App(express(), configService, routes);
module.exports = app

