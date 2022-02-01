const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const { DI } = require("./services/IOC");

const app = DI.container.App;
const AuthRouter = DI.container.AuthRouter;

app.addMiddleWares([
    cors(),
    morgan("tiny"),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
]);

app.addRoutes([
    {
        basePath: "/api/v1",
        routers: [ AuthRouter ]
    }
]);

app.run();