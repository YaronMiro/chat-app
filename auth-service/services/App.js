class App {
    constructor(app, port) {
        this.app = app;
        this.port = port;
    }

    addMiddleWares(middleWares = []){
        const isCallbacks = middleWares.every(callback => typeof callback === 'function')
        if (!Array.isArray(middleWares) || !isCallbacks) {
            throw new Error('middleWares must be an array of callbacks');
        }

        middleWares.forEach(middleWare => this.app.use(middleWare));
    }

    addRoutes(routersData = []){
        routersData.forEach(routerData => {
            const { basePath: basePath, routers } = routerData

            if (!Array.isArray(routers)) {
                throw new Error('routers must be an array of Routes');
            }
            routers.forEach(({ basePath: routePath, router }) => {
                this.app.use(`${basePath}${routePath}`, router)
            })
        })
    }

    run(){
        this.app.listen(this.port, () =>
            console.log(`Server is running on port http://localhost:${this.port}`)
        );
    }
}

module.exports = App