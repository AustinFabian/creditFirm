const mongoose = require("mongoose");

const coinAddressSchema = new mongoose.Schema({
  coinName: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
});

const coinAddress = mongoose.model("coinAddress", coinAddressSchema);

module.exports = coinAddress;
