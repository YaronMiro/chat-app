const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const ENVIRONMENT_MODE = process.env.NODE_ENV || 'development';

const redisClient = require('./services/redis/redis');


app.get('/', (req, res) => res.send(`${ENVIRONMENT_MODE} enviroment says: Hello World!`));

// https://github.com/luin/ioredis

// https://codewithhugo.com/setting-up-express-and-redis-with-docker-compose/

// http://localhost:3000/store/my-key\?some\=value\&some-other\=other-value Success
app.get('/store/:key', async (req, res) => {
    const { key } = req.params;
    const value = req.query;
    await redisClient.setAsync(key, JSON.stringify(value));
    return res.send('Success');
});

// http://localhost:3000/my-key
app.get('/:key', async (req, res) => {
    const { key } = req.params;
    const rawData = await redisClient.getAsync(key);
    return res.json(JSON.parse(rawData));
});


app.listen(PORT, () => {console.log(`Example app listening on port ${PORT}!`)});