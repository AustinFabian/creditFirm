const express = require('express');
const authController = require('./../controllers/authController');
const coinController = require('./../controllers/coinController');

const router = express.Router();

router
.route('/')
// .get(coinController.getTours)
.post(authController.isLoggedIn,authController.restrictTo('admin'),coinController.createCoin);

router
.route('/:id')
// .get(tourController.getTour)
.patch(authController.isLoggedIn
  ,authController.restrictTo('admin')
  ,coinController.updateCoin)

module.exports = router;