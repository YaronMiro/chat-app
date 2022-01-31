
const { Router, METHODS } = require('../Router');

class AuthRouter extends Router {
    constructor(){
        super('/auth')

        this.routes = [
          {
            path: '/login',
            method: METHODS.GET,
            handler: this.handleLogin,
            localMiddleware: []
          },
        ]
    }

    handleLogin(req, res, next){
        res.send('Welcome to auth/login route')
    };
}

module.exports = new AuthRouter();