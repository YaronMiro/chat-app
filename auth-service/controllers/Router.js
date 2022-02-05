const yup = require('yup');

class Router {

  constructor(router, basePath = '') {

    this.methods = {
      GET: 'GET',
      POST: 'POST',
      PUT: 'PUT',
      DELETE: 'DELETE',
    };

    this.router = router;
    this.basePath = basePath;
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
    this.routes = [...this.routes, Object.assign({}, route)];
  }

  async validateRoute(route) { 

    try {
      const routeSchema = yup.object({
        path: yup.string().matches(/^\//, 'Path must start with a backslash ("/")'),
        // method: number().required().positive().integer(),
        // handler: string().email(),
        localMiddleware: yup.array().optional(),
      })

      const isValid = await routeSchema.validate(route);
      return true;
    } catch (err) {
      console.log(err.errors[0])
      return false;
    }
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