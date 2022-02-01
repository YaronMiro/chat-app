const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const { DI } = require("./services/IOC");

const App = DI.container.App;
const AuthRouter = DI.container.AuthRouter;

App.addMiddleWares([
    cors(),
    morgan("tiny"),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
]);

App.addRoutes([
    {
        basePath: "/api/v1",
        routers: [ AuthRouter ]
    }
]);

App.run();