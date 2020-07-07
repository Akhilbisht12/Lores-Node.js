var express = require("express");
router = express.Router();

feedPost = require("../models/feedPost")
upload = require("../multer");
passport = require("../passport");
//<<<<<<< HEAD
methodOverride = require("method-override")
//=======

// importing algo's
const engagementAlgos = require('../algorithms/engagement');

//>>>>>>> b1c8cf2477276d4731a8c6bc598488a2834df1d1
router.use(methodOverride("_method"));

// feed Routes
router.get("/feed/page", isLoggedIn, function(req, res) {
    // running alogos
    engagementAlgos();
    var query   = {};
    var options = {
        offset:   1, 
        limit:    1,
        sort:     { engagement: -1 },
    };
    feedPost.paginate(query,options).then(function(result){

            res.render("feed",{ feeds: result.docs,
                current: result.offset,
                pages: Math.ceil( result.total/result.limit) });
        
    })
});
// feed Routes
router.get("/feed/page/:page", isLoggedIn, function(req, res) {
    // running alogos
    engagementAlgos();
    var perPage = 1;
    var page = req.params.page || 1;

    feedPost.find({})
           .skip((perPage * page) - perPage)
           .limit(perPage).exec(function(err,data){
                if(err) throw err;
                feedPost.countDocuments({}).sort( { engagement: -1 }).exec((err,count)=>{          
                    res.render("feed", { feeds: data,
                    current: page,
                    pages: Math.ceil(count / perPage) });
                    
                  });
    })
});

// feedPost route
router.post("/feed/page", upload.single('postImage'), function(req, res) {
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
    res.redirect('/login')
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