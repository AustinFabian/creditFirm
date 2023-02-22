const express = require('express');
const emailController = require('./../controllers/emailController');
const router = express.Router();

router

.route('/')
.post(emailController.sendMail);

router
.route('/?:sender')
.post(emailController.sendMail);

module.exports = router;