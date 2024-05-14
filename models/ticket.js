const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ticketSchema = new Schema({
  event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  attendee: { type: Schema.Types.ObjectId, ref: "Attendee", required: true },
  allowedEntries: { type: Number, required: false, default: 1 },
  privileges: { type: String, required: false },
  entryCount: { type: Number, required: false, default: 0 },
});
const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
