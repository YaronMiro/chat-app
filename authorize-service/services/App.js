const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("../routes/v1/AuthRouter");

class App {
    constructor(app, middleWares, routers) {
        dotenv.config();
        this.port = process.env.PORT || 5000;
        this.app = app;
        this._addMiddleWares(middleWares)
        this._addRoutes(routers)
    }

    _addMiddleWares(middleWares = []){
        const isCallbacks = middleWares.every(callback => typeof callback === 'function')
        if (!Array.isArray(middleWares) || !isCallbacks) {
            throw new Error('middleWares must be an array of callbacks');
        }

        middleWares.forEach(middleWare => this.app.use(middleWare));
    }

    _addRoutes(routersData = []){
        routersData.forEach(routerData => {
            const { basePath, routers } = routerData

            if (!Array.isArray(routers)) {
                throw new Error('routers must be an array of Routes');
            }
            routers.forEach(routerData => {
                this.app.use(`${basePath}${routerData.path}`, routerData.router)
            })
        })
    }

    run(){
        this.app.listen(this.port, () =>
            console.log(`Server is running on port http://localhost:${this.port}`)
        );
    }
}

const middleWares = [
    cors(),
    morgan("tiny"),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
]

const routes = [
    {
        basePath: "/api/v1",
        routers: [ new AuthRouter() ]
    }
]

const app = new App(express(), middleWares, routes);
app.run();
module.exports = app

