const express = require("express");
const authController = require("./../controllers/authController");
const withdrawController = require("./../controllers/withdrawController");

const router = express.Router();

router
  .route("/")
  // .get(coinController.getTours)
  .post(authController.isLoggedIn, withdrawController.createWithdrawal);

router
  .route("/:id")
  .patch(
    authController.isLoggedIn,
    authController.restrictTo("admin"),
    withdrawController.updateWithdrawalStatus
  )
  .delete(
    authController.isLoggedIn,
    authController.restrictTo("admin"),
    withdrawController.deleteTransaction
  );

module.exports = router;
