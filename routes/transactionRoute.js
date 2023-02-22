const express = require("express");
const authController = require("../controllers/authController");
const transactionController = require("../controllers/transactionController");

const router = express.Router();

router
  .route("/")
  // .get(coinController.getTours)
  .post(authController.isLoggedIn, transactionController.createTransaction);

router
  .route("/:id")
  // .get(tourController.getTour)
  .patch(
    authController.isLoggedIn,
    authController.restrictTo("admin"),
    transactionController.updateTransactionStatus
  )
  .delete(
    authController.isLoggedIn,
    authController.restrictTo("admin"),
    transactionController.deleteTransaction
  );

module.exports = router;
