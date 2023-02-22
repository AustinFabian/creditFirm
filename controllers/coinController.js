const coinAddress = require("./../model/coinAddressModel");
const handler = require("./../controllers/handlerFactory");

// createCoin function
exports.createCoin = handler.createOne(coinAddress);

// updateCoin function
exports.updateCoin = handler.updateOne(coinAddress);
