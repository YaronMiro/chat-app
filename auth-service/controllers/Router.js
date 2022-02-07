
class Router {

  constructor(router, validator) {

    this.methods = {
      GET: 'GET',
      POST: 'POST',
      PUT: 'PUT',
      DELETE: 'DELETE',
    };

    this.validator = validator;
    this.router = router;
    this.routes = [];
    this._routes = [];
    this._setValidatorSchema();
  }

  set routes(routes){
    this._routes = routes.map( route => Object.assign({}, route));
    this._setRoutes();
  }

  get routes(){
   return this._routes;
  }

  _setValidatorSchema(){
    this.validator.setSchema({
      path: {
        presence: { message: "^Rout path is required" },
        format: {
          pattern: "^\/[\da-z-/]+$",
          flags: "i",
          message: "can only contain [a-z] and [0-9] and [-/]"
        }
      },
      method: {
        presence: { message: "^Rout request method is required" },
        inclusion: {
          within: this.methods,
          message: "\"%{value}\" is not a valid request method"
        }
      },
      handler: {
        presence: { message: "^Rout handler function is required" },
        type: "function"
      },
      localMiddleware: {
        arrayOf: {
          type: "function"
        }
      }
    });
  }

  addRoute(route){
    if (this.validateRoute(route) !== true) {
      return;
    }
    this.routes = [...this._routes, Object.assign({}, route)];
  }

  validateRoute(route) { 
    const validatorData = this.validator.validate(route);
    
    if (validatorData !== true) {
      // @todo[ERROR] replace with error service
      console.log("Route", route, 'is not valid', validatorData);
    }

    return validatorData;
  }

  _setRoutes() {
    for(const route of this._routes) {

      // Skip invalid routes.
      if (this.validateRoute(route) !== true) {
        continue;
      }
      
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

    };
  }
}

module.exports = Router;