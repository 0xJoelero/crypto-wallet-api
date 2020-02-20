const mongoose = require("mongoose");

const History = mongoose.model("History", {
  address: String,
  date: String,
  monto: Number,
  fee: Number,
  error: Boolean
});

module.exports = History;
