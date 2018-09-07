const Server = require('./server');

(async function f() {
  const server = new Server();
  await server.init();
  server.start();
}());
