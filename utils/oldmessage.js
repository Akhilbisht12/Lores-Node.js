var messagedb = require("../models/message")

function getmessage(username, room) {
    var msg = {};
    var newroom = username + "!@!@2@!@!" + room;
    const temp = newroom.split('!@!@2@!@!').reverse().join('!@!@2@!@!');
    messagedb.findOne({ $or: [{ "room": newroom }, { "room": temp }] }, function(err, foundMsg) {
        if (err) {
            console.log(err)
        } else {
            if (foundMsg) {
                console.log(foundMsg)
                msg = foundMsg;
            }
        }
    });
    return msg;

}

module.exports = getmessage();