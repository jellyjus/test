const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true });

class BaseHandler {
  constructor() {
    this.validator = ajv.compile(this.schema);
  }

  validate(req, res, next) {
    const data = req[this.dataKey];
    this.logs.info(`Start handling ${req.method} ${req.baseUrl} with params: ${JSON.stringify(data)}`);

    if (this.validator(data)) return next();

    return next(ajv.errorsText(this.validator.errors));
  }

  sendResponse(res, data) {
    this.logs.info(`Sending response for ${res.req.method} ${res.req.route.path} with data: ${JSON.stringify(data)}`);

    res.json({ res: data });
  }
}

module.exports = BaseHandler;
