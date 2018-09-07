const TABLE_NAME = 'logs';

class Logs {
  constructor(client) {
    this.client = client;
  }

  async create(values) {
    const query = {
      text: `INSERT INTO ${TABLE_NAME}(level, text) VALUES($1, $2)`,
      values,
    };

    const res = await this.client.query(query);
    return res;
  }
}

module.exports = Logs;
