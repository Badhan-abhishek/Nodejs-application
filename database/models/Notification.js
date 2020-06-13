const mongo = require('mongoose')

const NotificationSchema = new mongo.Schema({
    createdBy: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    notification: {
        type: String,
        required: true,
    },
    timeCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongo.model('Notification', NotificationSchema)