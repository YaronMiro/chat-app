
class Router {

  constructor(router, routeValidator) {

    this.methods = {
      GET: 'GET',
      POST: 'POST',
      PUT: 'PUT',
      DELETE: 'DELETE',
    };

    this.router = router;
    this.validator = routeValidator;
    this.routes = [];
    this._routes = [];
  }

  set routes(routes){
    this._routes = routes.map( route => Object.assign({}, route));
    this._setRoutes();
  }

  get routes(){
   return this._routes;
  }

  addRoute(route){
    this._routes = [...this._routes, Object.assign({}, route)];
  }

  validateRoute(route) { 
    console.log(this.validator)
  }

  _setRoutes() {
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
      
      // Set route by method.s
      const { GET, POST, PUT, DELETE } = this.methods;
      switch (method) {
        case GET:
            this.router.get(path, handler);
            break;
        case POST:
            this.router.post(path, handler);
            break;
        case PUT:
            this.router.put(path, handler);
            break;
        case DELETE:
            this.router.delete(path, handler);
            break;
        default:
            console.log('not a valid method')
            break;
      };

    });
  }
}

module.exports = Router;