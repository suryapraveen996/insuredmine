const http = require('http')
const app = require('./src/app');

const server = http.createServer(app);
server.listen(8082);

module.exports = app;
