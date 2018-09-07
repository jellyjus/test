const { Client } = require('pg');
const Logs = require('./models/Logs');

class Db {
  constructor(config) {
    this.client = new Client(config);
  }

  async connect() {
    await this.client.connect();
  }

  initModels() {
    this.logs = new Logs(this.client);
  }
}

module.exports = Db;
