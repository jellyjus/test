const BaseHandler = require('./BaseHandler');

class NumbersSqrt extends BaseHandler {
  constructor(db, logs) {
    super();
    this.db = db;
    this.logs = logs;
  }

  handle(req, res) {
    const data = req.body.map(item => Math.sqrt(item));
    this.sendResponse(res, data);
  }

  /* eslint-disable */
  get dataKey() {
    return 'body';
  }


  get schema() {
    return {
      type: 'array',
      items: { type: 'integer' },
    };
  }
  /* eslint-enable */
}

module.exports = NumbersSqrt;
