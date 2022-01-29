class TestRouter {
    constructor(router){
        router.get("/test", (req, res) => {
            res.send('Welcom to test Route')
        });
        return router;
    }
}

module.exports = TestRouter;