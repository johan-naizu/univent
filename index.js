const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

//import routes
const attendeeRoute = require("./routes/attendee");
const ticketRoute = require("./routes/ticket");
const eventRoute = require("./routes/event");

//import middleware
const authentication = require("./middleware/auth");
//app
const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors());
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
