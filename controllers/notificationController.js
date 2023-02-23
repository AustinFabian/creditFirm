const Notification = require("./../model/notificationsModel");
const catchAsync = require("./../utils/catchAsync");
// requiring our custom handler factory function
const handler = require("./handlerFactory");

// CREATE NOTIFICATION
exports.createNotification = handler.createOne(Notification);

// DELETE NOTIFICATION
exports.deleteNotification = handler.deleteOne(Notification);
