const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const { IOC } = require("./services/IOC");

const App = IOC.container.App;
const AuthRouter = IOC.container.AuthRouter;

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