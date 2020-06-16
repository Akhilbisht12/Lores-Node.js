const moment = require('moment');
var mongoose = require('mongoose');
var user = require("../models/user");
var message = require("../models/message");

function formatMessage(username, text, room) {

    return {
        username,
        text,
        time: moment().format('h:mm a')
    };
}

module.exports = formatMessage;