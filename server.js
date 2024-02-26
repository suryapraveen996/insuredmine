const http = require('http')
const app = require('./src/app');
const PORT = 8082;

const server = http.createServer(app);
// server.listen();

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

module.exports = app;
