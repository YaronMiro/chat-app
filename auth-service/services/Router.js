class Router {

  constructor(router, validator) {
    this.methods = {
      GET: 'GET',
      POST: 'POST',
      PUT: 'PUT',
      DELETE: 'DELETE',
    };

    this.validator = validator;
    this._router = router;
    this.routes = [];
    this._routes = [];
    this._setValidatorSchema();
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

  _setValidatorSchema(){
    this.validator.setSchema({
      path: {
        presence: { message: "^Rout path is required" },
        type: "string",
        format: {
          pattern: "^\/[0-9a-z-/]+$",
          flags: "i",
          message: "Must start with a slash, and can only contain [a-z] and [0-9] and [-/]"
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

module.exports = Router;