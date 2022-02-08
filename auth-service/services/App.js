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

    addRoutes(routersData = []){
        for (const data of routersData) {
            const { basePath = '', routers = [] } = data

            if (!Array.isArray(routers)) {
                // @todo[LOGGER]
                console.dir('routers must be an array', {depth: null});
                continue;
            }

            routers.forEach((router) => {
                if (router instanceof BaseController) {
                    this.app.use(`${basePath}${router.basePath}`, router.getRouter())
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