const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  month: String,
  year: String,
  filename: String,
});

module.exports = mongoose.model("Event", eventSchema);
