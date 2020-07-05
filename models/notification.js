var mongoose = require('mongoose')

var notificationSchema = mongoose.Schema({
    text: String,
    time: Object,
    date: Object,
    link: String,
})

module.exports = mongoose.model('notification', notificationSchema);