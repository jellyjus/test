const express = require('express');

const Middleware = require('./middleware');
const NumbersDivision = require('./handlers/NumbersDivision');
const NumbersSqrt = require('./handlers/NumbersSqrt');

class Routes {
  constructor(db, logs) {
    this.db = db;
    this.logs = logs;
    this.router = express.Router();

    this.middleware = new Middleware(this.logs);
  }

  initRoutes() {
    const numbersDivision = new NumbersDivision(this.db, this.logs);
    const numbersSqrt = new NumbersSqrt(this.db, this.logs);

    this.router.use('/numbers_division', numbersDivision.validate.bind(numbersDivision));
    this.router.get('/numbers_division', numbersDivision.handle.bind(numbersDivision));

    this.router.use('/numbers_sqrt', numbersSqrt.validate.bind(numbersSqrt));
    this.router.post('/numbers_sqrt', numbersSqrt.handle.bind(numbersSqrt));

    this.router.use(this.middleware.errorsMiddleware.bind(this.middleware));
  }
}

module.exports = Routes;
