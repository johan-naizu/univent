const mongoose = require("../util/db");
const Schema = mongoose.Schema;
const attendeeSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  organisation: { type: String, required: true },
  events: { type: Array, required: false, default: [] },
  tickets: { type: Array, required: false, default: [] },
  privileges: { type: String, required: false },
});
const Attendee = mongoose.model("Attendee", attendeeSchema);
module.exports = Attendee;
