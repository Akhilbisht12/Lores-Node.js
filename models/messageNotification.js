var mongoose = require('mongoose')

var messageNotificationSchema = mongoose.Schema({
    text: String,
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate : true
    },
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    link: String,
    time: Object,
    date: Object
})
messageNotificationSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('messageNotification', messageNotificationSchema);