const yup = require('yup');

const METHODS =  {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

class Router {
  static methods = METHODS;

  constructor(router, basePath = ''){
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
        // path: string().required(),
        // method: number().required().positive().integer(),
        // handler: string().email(),
        localMiddleware: yup.array(yup.string().optional()),
      })

      const isValid = await routeSchema.validate(route);
      console.log('Success!!')
      return true;
    } catch (err) {
      console.log('Error ?', err)
      return false;
    }
        //  path: '/page-1',
        //  method: METHODS.GET,
        //  handler: () => '/test/page-2',
        //  localMiddleware: []
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