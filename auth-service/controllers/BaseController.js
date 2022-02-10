
class BaseController {
  
    constructor(router, basePath) {
      this.basePath = basePath
      this.routerService = router;
    }

    set routes(routes){
      this.routerService.routes = routes;
    }
  
    get routes(){
     return this.routerService.routes;
    }

    getRouter(){
      return this.routerService.getRouter();
    }
}

module.exports = BaseController;