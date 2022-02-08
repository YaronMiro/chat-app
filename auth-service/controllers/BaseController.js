
class BaseController {
  
    constructor(router, basePath){
      this.basePath = basePath;
      this.routerService = router;
    }

    set routes(routes){
      this.routerService.routes = routes;
    }
  
    get routes(){
     return this.routes;
    }

    getRouter(){
      return this.routerService.router;
    }
}

module.exports = BaseController;