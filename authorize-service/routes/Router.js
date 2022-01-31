const express = require('express');
const router = express.Router();

const METHODS =  {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

class Router {
  static methods = METHODS;

  constructor(path = ''){
    this.router = router;
    this.path = path;
    this.routes = [];
    this._routes = [];
  }

  set routes(routes){
    this._routes = routes;
    this.setRoutes();
  }

  get routes(){
   return this._routes;
  }

  addRoute(route){
    this.routes = [...this.routes, route];
  }

  setRoutes() {
    this._routes.forEach( route => {
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
  }
}

module.exports = { Router, METHODS };