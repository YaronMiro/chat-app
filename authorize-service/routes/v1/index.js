const todoRoutes = require("./auth/router");

const BASE_PATH = "/api/v1";
module.exports = (app) => {
  app.use(BASE_PATH, todoRoutes);
};