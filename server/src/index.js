const express = require('express');
const app = express();
const port = process.env.SERVER_PORT;

app.get('/', (req, res) => res.send(`${process.env.NODE_ENV} enviroment says: Hello World!`));
app.listen(port, () => {console.log(`Example app listening on port ${port}!`)});