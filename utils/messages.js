const moment = require('moment');
const { urlencoded } = require('body-parser');
const users = require('./users');
messagedb = require("../models/message");
var username = String;

function formatMessage(user, text) {
    const temp = user.room.split('!@!@2@!@!').reverse().join('!@!@2@!@!');
    // messagedb.findOne({ "room": user.room, "room": temp }, function(err, foundMsg) {
    messagedb.findOne({ $or: [{ "room": user.room }, { "room": temp }] }, function(err, foundMsg) {

        if (err) {
            console.log(err);
        } else {
            if (!foundMsg) {
                messagedb.create({
                    room: user.room,
                    message: [{
                        sender: {
                            id: user.username,
                            msg: text
                        }
                    }]
                }, function(err, createdmsg) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("created");
                    }
                })
            } else {
                var pushmsg = {
                    sender: {
                        id: user.username,
                        msg: text
                    }
                }
                foundMsg.message.push(pushmsg);
                foundMsg.save();
            }
        }
    })
    username = user.username;
    return {
        username,
        text,
        time: moment().format('h:mm a')
    };
}

// function getmessage(user) {
//     var msg = {};
//     messagedb.findById(user.room, function(err, found) {
//         if (err) {
//             console.log(err);
//         } else {
//             msg = found;
//         }
//     })
//     return msg;
// }

module.exports = {
    formatMessage
    // getmessage
};