const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

module.exports = (app) => {
  // Load config
  dotenv.config();

  // Allow remote server incoming requests.
  app.use(cors());

  // Log Requests
  app.use(morgan("tiny"));

  // Parse requests.
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};