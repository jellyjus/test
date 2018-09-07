class Middleware {
  constructor(logs) {
    this.logs = logs;
  }

  errorsMiddleware(err, req, res, next) {
    const data = {
      error: {
        code: 400,
        message: err,
      },
    };

    this.logs.error(err);
    res.status(400).json(data);
    next();
  }
}

module.exports = Middleware;
