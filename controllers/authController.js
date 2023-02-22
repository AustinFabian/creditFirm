const util = require("util");
const User = require("./../model/userModel");
const Transaction = require("./../model/transactionsModel");
const Withdrawals = require("./../model/withdrawalsModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const dotenv = require("dotenv");
const AppError = require("./../utils/AppError");
const UserEmail = require("./../utils/email");

var utils = { ...util };

var promisify = utils.promisify;

dotenv.config({ path: __dirname + "/../config.env" });

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

function createSendToken(user, statusCode, req, res) {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "Success",
    token,
    data: {
      user,
    },
  });
}

// To Authenticate a user on signup
exports.signUp = catchAsync(async (req, res) => {
  // create a random account number
  var now = Date.now();
  var zer0 = "00";
  var accountNumber = now.toString().slice(5, 100000);
  accountNumber = zer0 + accountNumber.slice(0, 10);

  const newUser = await User.create({
    login: req.body.login,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    accountNumber: accountNumber,
  });

  // const url = `${req.protocol}://${req.get('host')}/me`

  // await new UserEmail(newUser).sendWelcome();

  createSendToken(newUser, 201, req, res);
});

// // To authenticate a user on login
exports.logIn = catchAsync(async (req, res, next) => {
  const { login, password } = req.body;

  // Check if email and password exists
  if (!login || !password) {
    return next(new AppError("please provide email and password", 404));
  }
  // Check if user exists and password is correct
  const user = await User.findOne({ login });

  if(!user){
    return next(new AppError("User not found check Login details and try again", 401));
  }

  // Check if both passwords is correct
  if (password === user.passwordConfirm) {
    createSendToken(user, 200, req, res);
  } else {
    return next(new AppError("Login Or password incorrect", 401));
  }
});

// // Middle ware for rendererrd page to check if user is logged in
exports.isLoggedIn = async (req, res, next) => {
  var cookieString = req.headers.cookie.split(" ");
  try {
    if (req.headers.cookie) {
      var jwtString;
      cookieString.forEach((e) => {
        if (e.startsWith("jwt")) {
          jwtString = e;
        }
      });
      jwtString = jwtString.slice(4, 1000000);
      // 1) Verification of token
      const decoded = await promisify(jwt.verify)(
        jwtString,
        process.env.JWT_SECRET
      );

      // 2)Check if user still exists
      const id = decoded.id;
      const currentUser = await User.findById(id);

      if (!currentUser) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      req.user = currentUser;
      res.locals.user = currentUser;

      // console.log(currentUser)

      return next();
    }
  } catch (err) {
    return next();
  }
  next();
};

exports.addTransaction = async (req, res, next) => {
  try {
    var userTransaction = await Transaction.find({
      transactionId: res.locals.user.id,
    });

    var user = await User.find({ _id: res.locals.user.id });

    var success = [];

    userTransaction.forEach((item) => {
      if (item.state === "successful") {
        success.push(item);
      }
    });

    if (success.length === 0) {
      return next();
    }

    var total = 0;

    success.forEach((item) => {
      total += item.equal;
    });

    res.locals.usersTransactions = success;

    if (user[0].worth === null || user[0].worth === 0) {
      await User.findByIdAndUpdate(
        res.locals.user.id,
        { worth: total },
        {
          new: true,
        }
      );
    } else {
    }
  } catch (err) {
    return next();
  }

  next();
};

exports.logOut = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "Success",
  });
};

// Code for user authorization to do specific activities in the web App
// Making use of the rest parameter syntax (new to restful api)

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You are not allowed to perform this task", 403)
      );
    }
    next();
  };
};

// writing code to allow user change or update password
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.body.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (user.password !== req.body.passwordCurrent) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, req, res);
});
