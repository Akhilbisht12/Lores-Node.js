const moment = require('moment');
var user = {};

function sendNotificationUser(getuser) {
    user = getuser;
}

function getNotificationUser() {
    return user;
}

function formatNotification(user, msg) {
    var username = user.username;
    return {
        username,
        msg,
        time: moment().format('h:mm a')
    }
}

module.exports = {
    getNotificationUser,
    sendNotificationUser,
    formatNotification
}