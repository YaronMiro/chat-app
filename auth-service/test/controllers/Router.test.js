
const { IOC } = require("../IOC");
const Router = IOC.container.Router;

describe('Testing Router Controller', () => {

    // Initialize our Router before each test.
    let router;
    beforeEach( () => router = Router.instance() );

    test('Adding a valid Route', () => {
        const isRouteValid = router.validateRoute(
            {
                path: '/page',
                method: router.methods.GET,
                handler: () => '/page',
                localMiddleware: []
            }
        )

        expect(isRouteValid).toBe(true);
    });

    test('Adding a non-valid Route', () => {
        const { path: pathError, method: methodError } =  router.validateRoute(
            {
                path: 'page',
                method: "SOME_METHOD",
                handler: () => '/page',
                localMiddleware: []
            }
        )

        expect(pathError).toBeDefined();
        expect(methodError).toBeDefined();
    });



    // test('Adding Router routes', () => {

    //     const routes = [
    //         {
    //             path: '/page-1',
    //             method: METHODS.GET,
    //             handler: () => '/test/page-1',
    //             localMiddleware: []
    //         },
    //         {
    //             path: '/page-2',
    //             method: METHODS.GET,
    //             handler: () => '/test/page-2',
    //             localMiddleware: []
    //         },
    //     ]
        
    //     router.routes = routes;
    //     expect(router.routes).toEqual(routes);
    // });

});
