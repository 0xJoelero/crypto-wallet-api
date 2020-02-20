const mongoose = require("mongoose");

const Wallet = mongoose.model("Wallet", {
  address: String,
  balance: Number
});

module.exports = Wallet;
