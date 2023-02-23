const express = require("express");
const router = express.Router();
const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");

router.get("/", viewController.getOverview);
router.get("/login", viewController.getLogin);
router.get("/signup", viewController.getSignup);
router.get("/dashboard", authController.isLoggedIn, viewController.getDash);
router.get("/profile", authController.isLoggedIn, viewController.getProfile);
router.get("/transfer", authController.isLoggedIn, viewController.getTransfer);
router.get(
  "/transaction-history",
  authController.isLoggedIn,
  viewController.getTransactions
);
router.get(
  "/users",
  authController.isLoggedIn,
  authController.restrictTo("admin"),
  viewController.getUserManager
);

router.get(
  "/airtime",
  authController.isLoggedIn,
  viewController.getUserAirtime
);

router.get("/fund", authController.isLoggedIn, viewController.getFundAccount);

router.get(
  "/loan-apply",
  authController.isLoggedIn,
  viewController.getLoanApply
);


router.get(
  "/all-notifications",
  authController.isLoggedIn,
  authController.restrictTo("admin"),
  viewController.getAllNotification
);

module.exports = router;
