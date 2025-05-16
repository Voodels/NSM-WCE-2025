const mongoose = require("mongoose");

const importantLinkSchema = new mongoose.Schema({
  title: String,
  filename: String,
});

module.exports = mongoose.model("ImportantLink", importantLinkSchema);
