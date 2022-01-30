const express = require('express');
const router = express.Router();

class Router {
  static methods = {
    GET: 'GET',
    POST: 'POST ',
    PUT: 'PUT ',
    DELETE: 'DELETE ',
  }

  constructor(path = '', routes = []){
    this.router = router;
    this.path = path;
    this.routes = routes;
  }

  addRoute(route){
    this.routes = [...this.routes, route];
  }

  setRoutes() {
    this.routes.forEach( route => {

      const {
        path,
        localMiddleware = [],
        handler,
        method
      } = route

      // Add local middleware if exists.
      if (Array.isArray(localMiddleware) && localMiddleware.length >= 1) {
        this.router.use(path, localMiddleware);
      }

      // Set route by method.
      switch (method) {
        case Router.methods.GET:
            this.router.get(path, handler);
            break;
        case Router.methods.POST:
            this.router.post(path, handler);
            break;
        case Router.methods.PUT:
            this.router.put(path, handler);
            break;
        case Router.methods.DELETE:
            this.router.delete(path, handler);
            break;
        default:
            console.log('not a valid method')
            break;
      };

    });

    return this.router;

  }
}

module.exports = Router;