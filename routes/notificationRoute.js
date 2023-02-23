const express = require('express');
const authController = require('../controllers/authController');
const notificationController = require('./../controllers/notificationController');

const router = express.Router();

router
.route('/')
// .get(coinController.getTours)
.post(authController.isLoggedIn,authController.restrictTo('admin'),notificationController.createNotification);

router
.route('/:id')
// .get(tourController.getTour)
.delete(authController.isLoggedIn
  ,authController.restrictTo('admin')
  ,notificationController.deleteNotification)

module.exports = router;