//setup and connect mongoose
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}`,
  )
  .then(() =>
    console.log(`Connected to MongoDB at ${process.env.DATABASE_URL}`),
  )
  .catch((err) => console.error("Could not connect to MongoDB", err));

module.exports = mongoose;
