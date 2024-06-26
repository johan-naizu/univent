const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
//SETUP
const createFirstAdmin = require("./util/setup");
createFirstAdmin();
//import routes
const attendeeRoute = require("./routes/attendee");
const ticketRoute = require("./routes/ticket");
const eventRoute = require("./routes/event");
const organiserRoute = require("./routes/organiser");
//import middleware
const metricsMiddleware = require("./middleware/prometheus");
const { getMetrics } = require("./controllers/prometheus");
const authentication = require("./middleware/auth");
//app
const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(metricsMiddleware);
app.get("/metrics", getMetrics);
app.use("/organiser", organiserRoute);
app.use(authentication);

//routes middleware
app.use("/attendee", attendeeRoute);
app.use("/ticket", ticketRoute);
app.use("/event", eventRoute);

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
