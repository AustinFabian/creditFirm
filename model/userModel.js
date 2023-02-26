const mongoose = require("mongoose");
// const crypto = require('crypto');
const validator = require("validator");
// const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Please fill a name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please input an Email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid Email"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 5,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords are not the same!",
    },
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  accountNumber: {
    type: String,
  },
  balance: {
    type: Number,
    default: 0,
  },
  dateJoined: {
    type: String,
    default: new Date().toUTCString(),
  },
  transactions:{
    type: Number,
    default: 0
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
