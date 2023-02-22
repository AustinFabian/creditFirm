const mongoose = require("mongoose");

const withdrawalSchema = new mongoose.Schema({
  state: {
    type: String,
    default: "Prepeared",
  },
  transactionId: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  date: {
    type: String,
    default: "",
  },
  payment: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  amount: {
    type: Number,
  },
  img: {
    type: String,
  },
});

const Withdrawals = mongoose.model("Withdrawal", withdrawalSchema);

module.exports = Withdrawals;
