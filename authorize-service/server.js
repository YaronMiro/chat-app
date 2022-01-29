const express = require("express");
const configService = require("./services/config-service");

const app = express();
const port = process.env.AUTH_SERVICE_PORT || 5000;

// Run Config.
configService(app);

// Load Routes.
const routesV1 = require("./routes/v1/");
routesV1(app);

app.listen(port, () =>
  console.log(`Server is running on port http://localhost:${port}`)
);