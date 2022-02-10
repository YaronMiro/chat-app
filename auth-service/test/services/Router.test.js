
const { IOC } = require("../../services/IOC");
const Router = IOC.container.Router;

describe('Testing Router Class', () => {

    // Initialize our Router before each test.
    let router;
    beforeEach( () => router = Router.instance() );

    test('Valid "route" data', () => {
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

    test('Invalid "route" data', () => {
        const {
            path: pathError,
            method: methodError,
            handler: handlerError,
            localMiddleware: localMiddlewareError,
        } =  router.validateRoute(
            {
                path: 'some invalid route path',
                method: "INVALID_METHOD_TYPE",
                handler: 'not a function',
                localMiddleware: ['not a function 1', 'not a function 2']
            }
        )

        expect(pathError).toBeDefined();
        expect(methodError).toBeDefined();
        expect(handlerError).toBeDefined();
        expect(localMiddlewareError).toBeDefined();
    });


    test('Add a single valid "route"', () => {
        const route = {
            path: '/new-route-1',
            method: router.methods.GET,
            handler: () => 'this is page-1',
            localMiddleware: []
        }
        router.addRoute(route);
        expect(route).toEqual(router.routes[0]);
    });

    test('Add a single invalid "route"', () => {
        router.addRoute({
            path: 'some invalid route path',
            method: router.methods.GET,
            handler: () => 'this is page',
            localMiddleware: []
        })

        expect(router.routes.length).toEqual(0);
    });


    test('Add multiple valid "routes"', () => {
        const routes = [
            {
                path: '/page-1',
                method: router.methods.GET,
                handler: () => 'this is page-1',
                localMiddleware: []
            },
            {
                path: '/page-2',
                method: router.methods.GET,
                handler: () => 'this is page-2',
                localMiddleware: []
            },
        ]

        router.routes = routes;
        expect(routes).toEqual(router.routes);
    });

    test('Add mixed valid and invalid "routes"', () => {
        const routes = [
            {
                path: '/page-1',
                method: router.methods.GET,
                handler: () => 'this is page-1',
                localMiddleware: []
            },
            {
                path: 'some invalid route path',
                method: "INVALID_METHOD_TYPE",
                handler: 'not a function',
                localMiddleware: ['not a function 1', 'not a function 2']
            },
        ]

        router.routes = routes;
        expect(routes[0]).toEqual(router.routes[0]);
        expect(router.routes.length).toEqual(1);

    });

});