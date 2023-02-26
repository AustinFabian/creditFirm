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
    type: String,
    default: new Date().toUTCString(),
  },
  type: {
    type: String,
  },
  amount: {
    type: Number,
  },
  recipient: {
    type: String,
  },
  sourceCode: {
    type: Number,
    default: 221212
  }
});

const Transactions = mongoose.model("Transaction", transactionSchema);

module.exports = Transactions;
