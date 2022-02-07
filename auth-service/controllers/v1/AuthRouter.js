
class AuthRouter {
    constructor(router, basePath){
      this.basePath = basePath;
      this.routerService = router;
      this.setRoutes()
    }

    setRoutes(){
      this.routerService.routes = [
        {
          path: '/login',
          method: this.routerService.methods.GET,
          handler: this.handleLogin,
          localMiddleware: []
        },
      ]
    }

    getRouter(){
      return this.routerService.router;
    }

    handleLogin(req, res, next){
        res.send('Welcome to auth/login route')
    };
}

module.exports = AuthRouter;