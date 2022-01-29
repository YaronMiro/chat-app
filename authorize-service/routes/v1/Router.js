const express = require('express');
const router = express.Router();
const AuthRouter = require("./auth/AuthRouter");

class Router {
  constructor(app){
    app.use("/api/v1", new AuthRouter(router))
  }
}

module.exports = Router;