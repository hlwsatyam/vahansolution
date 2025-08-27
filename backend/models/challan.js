const mongoose = require("mongoose");

const rcSchema = new mongoose.Schema({
  rcNumber: { type: String,   required: true }, // RC number
  engine_number: { type: String,   required: true }, // RC number
  chassis_number: { type: String,   required: true }, // RC number
  data: { type: Object, required: true }, // API ka pura response store karenge
  fetchedAt: { type: Date, default: Date.now }, // kab fetch kiya tha
});

module.exports = mongoose.model("challan", rcSchema);