const express = require('express');
const router = express.Router();
const AuthRouter = require("./AuthRouter");
const TestRouter = require("./TestRouter");

class Router {
  constructor(app){
    this.basePath = "/api/v1";
    app.use(this.basePath, new AuthRouter(router))
    app.use(this.basePath, new TestRouter(router))
  }
}

module.exports = Router;