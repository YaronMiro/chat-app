const path = require('path');

module.exports = {
  apps: [{
    name: 'server',
    script: 'src/index.js',
    env: {},
    env_production: {},
    instances: 4,
    autorestart: true,
    watch: process.env.NODE_ENV !== 'production' ? path.resolve(__dirname, 'src') : false,
    max_memory_restart: '1G'
  }]
};