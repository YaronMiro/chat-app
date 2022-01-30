
const Router = require('../Router');

class AuthRouter extends Router {
    constructor(){
        super('/auth')

        this.routes = [
          {
            path: '/login',
            method: Router.methods.GET,
            handler: this.handleLogin,
            localMiddleware: []
          }
        ]

        this.setRoutes();
    }

    handleLogin(req, res, next){
        res.send('Welcome to auth/login route')
    };
}

module.exports = AuthRouter;