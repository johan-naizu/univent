const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const organiserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
});
const Organiser = mongoose.model("Organiser", organiserSchema);
module.exports = Organiser;
