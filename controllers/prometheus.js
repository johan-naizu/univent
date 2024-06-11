const promClient = require("prom-client");

// Create a Registry which registers the metrics
const register = new promClient.Registry();

// Add a default metrics collection
promClient.collectDefaultMetrics({ register });

// Define custom metrics
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "code"],
  buckets: [50, 100, 200, 300, 400, 500, 1000],
});

// Register the custom metrics
register.registerMetric(httpRequestDurationMicroseconds);

// Controller function to handle the /metrics endpoint
const getMetrics = async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
};

module.exports = {
  register,
  httpRequestDurationMicroseconds,
  getMetrics,
};
