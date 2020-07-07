var mongoose = require('mongoose')
var user = require('../models/user');
const notification = require('../models/notification');

mongoose.set('useFindAndModify', false);

function likeNotificationAlgo(req, userId){
user.findByIdAndUpdate( userId , { $inc: {'loresPoints': 10 }}, function(err, user){
    if(err){
        console.log(err);
    }else{
        notification.create({
            type : 'liked',
            username : req.user.username,
            time: moment().format('h:mm a'),
            link : req.params.id
        }, function(err, created){
            if(err){
                console.log(err);
            }else{
                user.notification.push(created);
                user.save;
            }
        })
    }
})
}

module.exports = likeNotificationAlgo;