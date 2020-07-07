var express = require("express");
router = express.Router();
feedPost = require("../models/feedPost")
user = require('../models/user')
notification = require('../models/notification')
Comments = require("../models/comments")
moment = require('moment')
likeNotificationAlgo = require('../algorithms/likeNotificationAlgo')
passport = require("passport");

mongoose.set('useFindAndModify', false);

// comment Post route
router.post("/feed/:id", function(req, res) {
    feedPost.findById(req.params.id, function(err, foundPost) {
        if (err) {
            console.log(err);
        } else {
            Comments.create({
                comment: {
                    text: req.body.postComment,
                    author: req.user._id
                },
            }, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    foundPost.comments.push(comment);
                    foundPost.save();
                    user.findByIdAndUpdate(foundPost.author.id._id,{$inc: {'loresPoints': 20 }}, function(err, user){
                        if(err){
                            console.log(err);
                        }else{
                            notification.create({
                                username : req.user.username,
                                type : 'commented on',
                                time: moment().format('h:mm a'),
                                link : req.params.id
                            }, function(err, created){
                                if(err){
                                    console.log(err);
                                }else{
                                    user.notification.push(created);
                                    user.save();
                                }
                            })
                        }
                    })
                    res.redirect("/feed/" + req.params.id);
                }
            })
        }
    })
});

// like route
router.get('/like/:id', function(req,res){
    feedPost.findById(req.params.id, function(err,post){
        if(err){
            console.log(err)
        }else{
            post.likes.push(req.user._id);
            post.save();
            likeNotificationAlgo(req, post.author.id._id);
            res.send('liked');
        }
    })
})



module.exports = router;