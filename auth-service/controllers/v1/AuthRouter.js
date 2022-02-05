
class AuthRouter {
    constructor(router, basePath){
      router.basePath = basePath;
      router.routes = [
          {
            path: '/login',
            method: router.methods.GET,
            handler: this.handleLogin,
            localMiddleware: []
          },
        ]
      this.router = router.router;
    }

    handleLogin(req, res, next){
        res.send('Welcome to auth/login route')
    };
}

module.exports = AuthRouter;