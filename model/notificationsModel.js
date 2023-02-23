const mongoose = require('mongoose');

const notifySchema = new mongoose.Schema(
    {
        notification:{
            type: String,
            required: [true, 'Notification cannot be empty']
        },
        createdAt:{
            type: String,
            default: new Date().toUTCString()
        },
        userId : {
            type: String
        },
        userImg : {
            type: String
        },
        userLogin : {
            type: String
        }
    }
);

const Notification = mongoose.model('Notification',notifySchema);

module.exports = Notification;
