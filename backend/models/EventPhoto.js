const mongoose = require("mongoose");

const eventPhotoSchema = new mongoose.Schema({
  filename: String,
});

module.exports = mongoose.model("EventPhoto", eventPhotoSchema);
