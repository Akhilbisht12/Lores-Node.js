const moment = require('moment');
messageNotificationdb = require('../models/messageNotification')
userdb = require('../models/user')
var user = {};

function sendNotificationUser(getuser) {
    user = getuser;
}

function getNotificationUser() {
    return user;
}

function formatNotification(user, msg) {
    console.log(user)
    var username = user.username;
    var notification = {
        username,
        msg,
        time: moment().format('h:mm a'),
        hour : moment().format('DD MM YY')
    }
    messageNotificationdb.findOneAndUpdate({ $and: [{ "fromUser": user.username }, { "toUser": user.user2 }] },
    {   text : msg,
        fromUser : user.username,
        toUser : user.user2,
        time: moment().format('h:mm a'),
        hour : moment().format('DD/MM/YYYY')
    },
    function(err, found){
        if(err){
            console.log(err);
        }else{
            if(!found){
                messageNotificationdb.create({
                    text : msg,
                    fromUser : user.username,
                    toUser : user.user2,
                    time: moment().format('h:mm a'),
                    hour : moment().format('DD/MM/YYYY')
                }, function(err, msgnot){
                    if(err){
                        console.log(err);
                    }else{
                        userdb.findById(user.user2, function(err, user){
                            if(err){
                                console.log(err)
                            }else{
                                user.messageNotification.push(msgnot);
                                user.save();
                            }
                        });
                    }
                })
            }
        }
    })
    return notification
}

module.exports = {
    getNotificationUser,
    sendNotificationUser,
    formatNotification
}