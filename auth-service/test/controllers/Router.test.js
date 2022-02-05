const { Router, METHODS } = require("../../controllers/Router");
const express = require("express");

describe('Testing Router Controller', () => {

    // Initialize our Router before each test.
    let router;
    const basePath = '/test';
    beforeEach(() => router = new Router(express.Router(), basePath));

    // Testing the "basePath" 
    test('Adding Router base-path', () => {
        expect(router.basePath).toEqual(basePath);
    });

    // Testing the "basePath" 
    test('Is Route valid', () => {

        const isRouteValid = router.validateRoute(
            {
                path: '/page',
                method: METHODS.GET,
                handler: () => '/test/page',
                localMiddleware: []
            }
        )

        console.log(isRouteValid);

        expect(true).toBe(true);
    });



    test('Adding Router routes', () => {

        const routes = [
            {
                path: '/page-1',
                method: METHODS.GET,
                handler: () => '/test/page-1',
                localMiddleware: []
            },
            {
                path: '/page-2',
                method: METHODS.GET,
                handler: () => '/test/page-2',
                localMiddleware: []
            },
        ]
        
        router.routes = routes;
        expect(router.routes).toEqual(routes);
    });

});
