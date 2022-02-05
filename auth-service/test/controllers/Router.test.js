const Router  = require("../../controllers/Router");
const express = require("express");

describe('Testing Router Controller', () => {

    // Initialize our Router before each test.
    let router;
    const basePath = '/test';
    beforeEach(() => router = new Router(express.Router()));

    // Testing the "basePath" 
    test('Adding Router base-path', () => {
        // expect(router.basePath).toEqual(basePath);
    });

    // Testing the "basePath" 
    // test('Is Route valid', async () => {

    //     const isRouteValid = await router.validateRoute(
    //         {
    //             path: 'page',
    //             method: METHODS.GET,
    //             handler: () => '/test/page',
    //             localMiddleware: []
    //         }
    //     )

    //     expect(isRouteValid).toBe(true);
    // });



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
