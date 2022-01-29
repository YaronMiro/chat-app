class AuthRouter {
    constructor(router){
        router.get("/auth", (req, res) => {
            res.send('some text 10!')
        });
        return router;
    }
}

module.exports = AuthRouter;