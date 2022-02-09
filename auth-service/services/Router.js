const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

class Router {

  constructor(router, routerValidator) {
    this.methods = METHODS;

    this.validator = routerValidator;
    this._router = router;
    this.routes = [];
    this._routes = [];
  }

  set routes(routes){
    const validRoutes = [];
    for(const route of routes) {
      const validationError = this.validateRoute(route);
       if (!validationError) {
        validRoutes.push(Object.assign({}, route))
      }
    }
    this._routes = validRoutes;
    this._setRoutes();
  }

  get routes(){
   return this._routes;
  }

  getRouter(){
    return this._router;
  }

  addRoute(route){
    const validationError = this.validateRoute(route)
    if (validationError) {
      return;
    }
    this.routes = [...this._routes, Object.assign({}, route)];
  }

  validateRoute(route) { 
    // @todo[LOGGER]
    return this.validator.validate(route);
  }

  _setRoutes() {
    for(const route of this._routes) {

      const {
        path,
        localMiddleware = [],
        handler,
        method
      } = route


      // Add local middleware if exists.
      if (Array.isArray(localMiddleware) && localMiddleware.length >= 1) {
        this._router.use(path, localMiddleware);
      }
      
      // Set route by method.s
      const { GET, POST, PUT, DELETE } = this.methods;
      switch (method) {
        case GET:
            this._router.get(path, handler);
            break;
        case POST:
            this._router.post(path, handler);
            break;
        case PUT:
            this._router.put(path, handler);
            break;
        case DELETE:
            this._router.delete(path, handler);
            break;
        default:
            console.log('not a valid method')
            break;
      };

    };
  }
}

module.exports = { Router, METHODS };