
const BaseController = require('../BaseController');

class AuthController extends BaseController {

  constructor(router, basePath){
      super(router, basePath);
      this.routes = [
        {
          path: '/login',
          method: this.routerService.methods.GET,
          handler: this.handleLogin,
          localMiddleware: []
        },
      ]
    }

    handleLogin(req, res, next){
        res.send('Welcome to auth/login route')
    };
}

module.exports = AuthController;