const mongoose = require("../util/db");
const Schema = mongoose.Schema;
const eventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  attendeeCount: { type: Number, required: false },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
