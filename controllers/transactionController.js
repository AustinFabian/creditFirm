const Transactions = require("../model/transactionsModel");
const handler = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const User = require("../model/userModel");
const AppError = require("../utils/AppError");
const UserEmail = require("../utils/email");

// createTranaction function
exports.createTransaction = catchAsync(async (req, res, next) => {
  var user = await User.findOne({ _id: req.body.transactionId });

  var userBalance = user.balance;

  var newBalance;

  if (req.body.type == "deposit") {
    newBalance = parseInt(userBalance) + parseInt(req.body.amount);
  } else {
    newBalance = parseInt(userBalance) - parseInt(req.body.amount);
  }

  await User.findByIdAndUpdate(
    user.id,
    { balance: newBalance },
    {
      new: true,
    }
  );

  const doc = await Transactions.create({
    transactionId: req.body.transactionId,
    type: req.body.type,
    date: new Date().toUTCString(),
    userName: req.body.userName,
    userImg: req.body.userImg,
    userEmail: req.body.userEmail,
    bank: req.body.bank,
    recipient: req.body.recipient,
    sourceCode: req.body.sourceCode,
    amount: req.body.amount,
  });

  // const url = `${req.protocol}://${req.get("host")}/operations`;

  var client = await User.findOne({ _id: req.body.transactionId });

  var clientForEmail = {};

  clientForEmail.transactionAmount = req.body.amount;
  clientForEmail.sentTo = req.body.bank;
  clientForEmail.TransactionDate = doc.date;
  clientForEmail.sender = req.body.userName;
  clientForEmail.recipient = req.body.recipient;
  clientForEmail.TransactionStatus = doc.state;
  clientForEmail.sourceCode = doc.sourceCode;
  clientForEmail.userEmail = client.email;
  clientForEmail.transactionType = req.body.type;

  await new UserEmail(clientForEmail).sendReciept();

  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

// update Status function
exports.updateTransactionStatus = catchAsync(async (req, res, next) => {
  if (req.body.state === "successful") {
    var document = await Transactions.find({ _id: req.params.id });

    var documentStatus = document[0].state;

    if (documentStatus === req.body.state) {
      return next(new AppError("Transaction SuccessFul already", 404));
    } else {
      var transaction = await Transactions.find({ _id: req.params.id });

      const doc = await Transactions.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

      if (!doc) {
        return next(new AppError("No document found with that ID", 404));
      }

      var user = await User.find({ _id: transaction[0].transactionId });

      var sum;

      if (transaction[0].type === "deposit") {
        sum = user[0].balance += transaction[0].amount;
      } else if (transaction[0].type === "transfer") {
        sum = user[0].balance -= transaction[0].amount;
      } else if (transaction[0].type === "airtime") {
        sum = user[0].balance -= transaction[0].amount;
      }

      var userNewWorth = await User.findByIdAndUpdate(
        user[0].id,
        { balance: sum },
        {
          new: true,
        }
      );

      const url = `${req.protocol}://www.${req.get("host")}/operationStaking`;
    }
  } else if (req.body.state === "declined") {
    var document = await Transactions.find({ _id: req.params.id });

    var documentStatus = document[0].state;

    if (documentStatus === req.body.state) {
      return next(new AppError("Transaction Declined already", 404));
    } else {
      var transaction = await Transactions.find({ _id: req.params.id });

      const doc = await Transactions.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

      if (!doc) {
        return next(new AppError("No document found with that ID", 404));
      }

      var user = await User.find({ _id: transaction[0].transactionId });

      var sum;

      if (transaction[0].type === "deposit") {
        sum = user[0].balance -= transaction[0].amount;
      } else if (transaction[0].type === "transfer") {
        sum = user[0].balance += transaction[0].amount;
      } else if (transaction[0].type === "airtime") {
        sum = user[0].balance += transaction[0].amount;
      }

      var userNewWorth = await User.findByIdAndUpdate(
        user[0].id,
        { balance: sum },
        {
          new: true,
        }
      );
    }
  }

  res.status(200).json({
    status: "success",
  });
});

// delete stake function
exports.deleteTransaction = handler.deleteOne(Transactions);
