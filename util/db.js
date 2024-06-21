const fs = require("fs");
const util = require("util");
const logFile = fs.createWriteStream("logs/console.log", { flags: "a" }); // 'a' for appending
const logStdout = process.stdout;

console.log = function () {
  const message = util.format.apply(null, arguments) + "\n";
  logFile.write(message);
  logStdout.write(message);
};
console.error = function () {
  const message = util.format.apply(null, arguments) + "\n";
  logFile.write(message);
  logStdout.write(message);
};
//setup and connect mongoose
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}`,
  )
  .then(() =>
    console.log(`Update : Connected to MongoDB at ${process.env.DATABASE_URL}`),
  )
  .catch((err) => console.error("Could not connect to MongoDB", err));

module.exports = mongoose;
