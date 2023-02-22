const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  state: {
    type: String,
    default: "successful",
  },
  bank: {
    type: String,
    default: "Bank name not required"
  },
  transactionId: {
    type: String,
  },
  userName: {
    type: String,
  },
  userImg: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  type: {
    type: String,
  },
  amount: {
    type: Number,
  },
});

const Transactions = mongoose.model("Transaction", transactionSchema);

module.exports = Transactions;
