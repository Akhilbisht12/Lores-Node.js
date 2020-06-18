const moment = require('moment');
const { urlencoded } = require('body-parser');
const user = require('../models/user');
messagedb = require("../models/message");
var username = String;

function formatMessage(user, text) {
    const temp = user.room.split('!@!@2@!@!').reverse().join('!@!@2@!@!');
    // messagedb.findOne({ "room": user.room, "room": temp }, function(err, foundMsg) {
    messagedb.findOne({ $or: [{ "room": user.room }, { "room": temp }] }, function(err, foundMsg) {

        if (err) {
            console.log(err);
        } else {
            console.log(foundMsg)
            if (!foundMsg) {
                console.log(foundMsg)
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
                console.log("from else" + typeof(foundMsg));
                console.log(foundMsg.message)
                console.log(foundMsg.room)
                console.log(foundMsg._id)
                foundMsg.message.push(pushmsg);
                foundMsg.save();
                console.log(foundMsg)
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

// function getOldMessage(user) {
//     messagedb.findOne({ "room": user.room }, function(err, foundMsg) {
//         if (err) {
//             console.log(err)
//         } else {
//             print(foundMsg);
//         }
//     })

//     var m = function print(object) {
//         return (object);
//     }
//     return m;
// }

const getOldMessage = user => new Promise((resolve, reject) =>
    messagedb.findOne({ "room": user.room }, (err, foundMsg) => {
        if (err) return reject(err);
        resolve(foundMsg);
    })
);


module.exports = {
    formatMessage,
    getOldMessage
};