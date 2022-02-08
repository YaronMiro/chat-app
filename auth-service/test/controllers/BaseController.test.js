
const BaseController = require("../../controllers/BaseController");
const Router = require('../mocks/Router');

describe('Testing BaseController', () => {

    // Initialize our Router before each test.
    let controller;
    const basePath = '/test';
    beforeEach( () => controller = new BaseController(new Router(), basePath) );

    test('Creating an instance of Base Controller', () => {
        expect(basePath).toEqual(controller.basePath);
    });
    
    test('Adding routes to Base Controller', () => {
        const routes = ['/page-1','/page-2'];
        controller.routes = routes;
        expect(routes).toEqual(controller.routes);
    });

    test('Get Router from Base Controller', () => {
        expect(controller.getRouter()).toBeTruthy();
    });

});