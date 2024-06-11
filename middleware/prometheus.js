const {
  httpRequestDurationMicroseconds,
} = require("../controllers/prometheus");

const metricsMiddleware = (req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on("finish", () => {
    end({ method: req.method, route: req.url, code: res.statusCode });
  });
  next();
};

module.exports = metricsMiddleware;
