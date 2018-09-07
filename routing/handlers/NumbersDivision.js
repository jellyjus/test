const BaseHandler = require('./BaseHandler');

class NumbersDivision extends BaseHandler {
  constructor(db, logs) {
    super();
    this.db = db;
    this.logs = logs;
  }

  handle(req, res) {
    const data = +req.query.a / +req.query.b;

    this.sendResponse(res, data);
  }

  /* eslint-disable */
  get dataKey() {
    return 'query';
  }

  get schema() {
    return {
      required: ['a', 'b'],
      properties: {
        a: { type: 'string', pattern: '^[0-9]+$' },
        b: { type: 'string', pattern: '^[0-9]+$' },
      },
    };
  }
  /* eslint-enable */
}

module.exports = NumbersDivision;
