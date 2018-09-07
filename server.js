const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const Db = require('./db/Db');
const Logs = require('./models/Logs');
const Routing = require('./routing/routes');

class Server {
  async init() {
    this.app = express();
    this.app.use(bodyParser.json());

    process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
    console.log('Init env:', process.env.NODE_ENV);

    this.initConfig();
    await this.initDb();
    this.initLogs();
    this.initRouting();
  }

  initConfig() {
    try {
      /* eslint-disable */
      this.config = require(`./config_${process.env.NODE_ENV}.json`);
      /* eslint-enable */
    } catch (e) {
      console.error('Error on initConfig', e);
      process.exit(1);
    }
  }

  async initDb() {
    try {
      this.db = new Db(this.config.db);
      await this.db.connect();
      this.db.initModels();
    } catch (e) {
      console.error('Error on initDb', e);
      process.exit(1);
    }
  }

  initLogs() {
    this.logs = new Logs(this.db);
  }

  initRouting() {
    this.logs.info('Init routing ...');
    const routing = new Routing(this.db, this.logs);

    routing.initRoutes();
    this.app.use(routing.router);
  }

  start() {
    const port = process.env.PORT || this.config.server.port;
    const host = process.env.HOST || this.config.server.host;
    this.server = http.createServer(this.app);

    this.server.listen(port, host, () => {
      this.logs.info(`Start listening on ${host}:${port}`);
    });
  }

  stop() {
    this.server.close();
  }
}

module.exports = Server;
