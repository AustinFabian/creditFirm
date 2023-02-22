const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const User = require("./../model/userModel");
const Transactions = require("./../model/transactionsModel");
const Withdrawals = require("./../model/withdrawalsModel");
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });

exports.getOverview = catchAsync(async (req, res, next) => {
  res.status(200).render("index", {});
});

exports.getLogin = catchAsync(async (req, res, next) => {
  res.status(200).render("sign_in", {});
});

exports.getSignup = catchAsync(async (req, res, next) => {
  res.status(200).render("sign_up", {});
});

exports.getDash = catchAsync(async (req, res, next) => {
  var userTransaction = await Transactions.find({ transactionId: req.user.id });

  var total = 0;

  var expense = 0;

  userTransaction.forEach((e) => {
    total += parseInt(e.amount);

    if (e.type == "transfer" || e.type == "airtime") {
      if (e.state == "successful") {
        expense += parseInt(e.amount);
      }
    }
  });

  res.status(200).render("dashboard", {
    userTransaction,
    total,
    expense
  });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  res.status(200).render("profile", {});
});

exports.getTransfer = catchAsync(async (req, res, next) => {
  var balance = req.user.balance;
  var line;
  var color;
  if (balance === 0) {
    line = 5;
    color = "red";
  } else {
    line = 70;
    color = "#f3cafd";
  }
  res.status(200).render("transfer", {
    line,
    color,
  });
});

exports.getUserAirtime = catchAsync(async (req, res, next) => {
  var balance = req.user.balance;
  var line;
  var color;
  if (balance === 0) {
    line = 5;
    color = "red";
  } else {
    line = 70;
    color = "#f3cafd";
  }
  res.status(200).render("airtime", {
    line,
    color,
  });
});

exports.getFundAccount = catchAsync(async (req, res, next) => {
  var balance = req.user.balance;
  var line;
  var color;
  if (balance === 0) {
    line = 5;
    color = "red";
  } else {
    line = 70;
    color = "#f3cafd";
  }
  res.status(200).render("fund", {
    line,
    color,
  });
});

exports.getTransactions = catchAsync(async (req, res, next) => {
  var allTransaction = await Transactions.find();

  var transfers = [];
  var airtimes = [];
  var deposits = [];

  allTransaction.forEach((el) => {
    if (el.type == "transfer") {
      transfers.push(el);
    } else if (el.type == "airtime") {
      airtimes.push(el);
    } else if (el.type == "deposit") {
      deposits.push(el);
    }
  });

  res.status(200).render("transactions", {
    allTransaction,
    transfers,
    airtimes,
    deposits,
  });
});

// LOAN PAGE RENDER

exports.getLoanApply = catchAsync(async (req, res, next) => {
  var balance = req.user.balance;
  var line;
  var color;
  if (balance === 0) {
    line = 5;
    color = "red";
  } else {
    line = 70;
    color = "#f3cafd";
  }
  res.status(200).render("loan", {
    line,
    color,
  });
});

// OPERATION STAKINGS
exports.operationStaking = catchAsync(async (req, res, next) => {
  var allTransaction = await Transactions.find();

  var userTransaction = await Transactions.find({ transactionId: req.user.id });

  res.status(200).render("operationStaking", {
    allTransaction,
    userTransaction,
  });
});

// OPERATION WITHDRAWAL

exports.operationsWithdrawal = catchAsync(async (req, res, next) => {
  var allWithdrawal = await Withdrawals.find();

  var userWithdrawal = await Withdrawals.find({ transactionId: req.user.id });

  res.status(200).render("operationsWithdrawal", {
    userWithdrawal,
    allWithdrawal,
  });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  var user = await User.findById(req.user.id);
  res.status(200).render("account", {
    user,
  });
});

exports.getUserManager = catchAsync(async (req, res, next) => {
  const users = await User.find();
  console.log(users);
  res.status(200).render("users", {
    users,
  });
});

exports.getUserData = catchAsync(async (req, res, next) => {
  const user = await User.find({ _id: req.params.id });

  var userData = user[0];

  res.status(200).render("userData", {
    userData,
  });
});

exports.getUserTransaction = catchAsync(async (req, res, next) => {
  const transactions = await Transactions.find({
    transactionId: req.params.id,
  });
  res.status(200).render("userTransactions", {
    transactions,
  });
});
