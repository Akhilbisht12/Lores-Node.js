var express = require("express");
router = express.Router();
feedPost = require("../models/feedPost")
Comments = require("../models/comments")
passport = require("passport");


// comment Post route
router.post("/feed/:id", function(req, res) {
    feedPost.findById(req.params.id, function(err, foundPost) {
        if (err) {
            console.log(err);
        } else {
            Comments.create({
                text: req.body.postComment,
                author: {
                    id: req.user._id,
                    username: req.user.username,
                    image: req.user.image
                }
            }, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    foundPost.comments.push(comment);
                    foundPost.save();
                    res.redirect("/feed/" + req.params.id);
                }
            })
        }
    })
});



module.exports = router;