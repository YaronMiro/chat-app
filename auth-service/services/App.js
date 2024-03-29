const BaseController = require('../controllers/BaseController');

class App {
    constructor(app, port) {
        this.app = app;
        this.port = port;
    }

    addMiddleWares(middleWares = []){
        if (!Array.isArray(middleWares)) {
            // @todo[LOGGER]
            console.log('middleWares must be an array')
            return;
        }

        const isCallbacks = middleWares.every(callback => typeof callback === 'function')
        
        if (!isCallbacks) {
            // @todo[LOGGER]
            console.log('middleWares must be an array of callbacks');
            return;
        }

        middleWares.forEach(middleWare => this.app.use(middleWare));
    }

    addRoutes(controllersData = []){
        for (const data of controllersData) {
            const { basePath = '', controllers = [] } = data

            if (!Array.isArray(controllers)) {
                // @todo[LOGGER]
                console.log('routers must be an array');
                continue;
            }

            controllers.forEach((controller) => {
                if (controller instanceof BaseController) {
                    this.app.use(`${basePath}${controller.basePath}`, controller.getRouter())
                }
            })
        }
    }

    run(){
        this.app.listen(this.port, () =>
            // @todo[LOGGER]
            console.log(`Server is running on port http://localhost:${this.port}`)
        );
    }
}

module.exports = App