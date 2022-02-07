
const { IOC } = require("../../services/IOC");
const Router = IOC.container.Router;

describe('Testing Router Controller', () => {

    // Initialize our Router before each test.
    let router;
    beforeEach( () => router = Router.instance() );

    test('Validating a valid Route', () => {
        const isRouteValid = router.validateRoute(
            {
                path: '/page',
                method: router.methods.GET,
                handler: () => '/page',
                localMiddleware: []
            }
        )

        expect(isRouteValid).toBeUndefined();
    });

    test('Validating a non valid Route', () => {
        const {
            path: pathError,
            method: methodError,
            handler: handlerError,
            localMiddleware: localMiddlewareError,
        } =  router.validateRoute(
            {
                path: 'some route path',
                method: "NOT_VALID_METHOD_TYPE",
                handler: 'not a function',
                localMiddleware: ['not a function 1', 'not a function 2']
            }
        )

        expect(pathError).toBeDefined();
        expect(methodError).toBeDefined();
        expect(handlerError).toBeDefined();
        expect(localMiddlewareError).toBeDefined();
    });


    test('Adding a single valid Route', () => {
        const route = {
            path: '/new-route-1',
            method: router.methods.GET,
            handler: () => '/page',
            localMiddleware: []
        }
        router.addRoute(route);
        expect(route).toEqual(router.routes[0]);
    });

    test('Adding a single non valid Route', () => {
        router.addRoute({
            path: 'non-valid-page',
            method: router.methods.GET,
            handler: () => '/page',
            localMiddleware: []
        })

        expect(router.routes.length).toEqual(0);
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
