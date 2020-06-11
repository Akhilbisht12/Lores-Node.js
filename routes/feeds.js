var express = require("express");
router = express.Router();
methodOverride = require("method-override")
feedPost = require("../models/feedPost")
upload = require("../multer");
passport = require("../passport");

router.use(methodOverride("_method"));

// feed Routes
router.get("/feed", isLoggedIn, function(req, res) {
    feedPost.find({}, function(err, feeds) {
        if (err) {
            console.log(err);
        } else {
            User
            res.render("feed", { feeds: feeds });

        }
    })
});

// feedPost route
router.post("/feed", upload.single('postImage'), function(req, res) {
    console.log(req.file);
    feedPost.create({
            feedText: req.body.postText,
            feedImage: req.file.path,
            author: {
                id: req.user._id,
                username: req.user.username,
                image: req.user.image
            }
        },
        function(err, post) {
            if (err) {
                console.log(err);
            } else {
                console.log(post);
            }

            res.redirect("/feed");
        });
})

// feed individual post route
router.get("/feed/:id", function(req, res) {
    feedPost.findById(req.params.id).populate("comments").exec(function(err, foundPost) {
        if (err) {
            console.log(err);
            res.redirect("/feed");
        } else {
            res.render("feedPost", { post: foundPost });
        }
    });
});

// edit feed functionality
router.get("/feed/:id/edit", isUserPost, function(req, res) {
    feedPost.findById(req.params.id, function(err, foundPost) {
        if (err) {
            res.redirect("/feed");
        } else {
            res.render("feedPostEdit", { post: foundPost });
        }
    });
});

router.put("/feed/:id/edit", isUserPost, function(req, res) {
    feedPost.findByIdAndUpdate(req.params.id, req.body.feed, function(err, updatePost) {
        if (err) {
            res.redirect("/feed");
        } else {
            console.log(updatePost)
            res.redirect("/feed/" + req.params.id);
        }
    });
});

router.delete("/feed/:id/delete", isUserPost, function(req, res) {
    feedPost.findByIdAndRemove(req.params.id, function(err, deletedPost) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("back");
        }
    })
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("\login");
}

function isUserPost(req, res, next) {
    if (req.isAuthenticated()) {
        feedPost.findById(req.params.id, function(err, post) {
            if (err) {
                console.log(err);
                res.redirect("back");
            } else {
                if (post.author.id.equals(req.user._id)) {
                    next();
                } else {
                    console.log(err);
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }

}

module.exports = router;