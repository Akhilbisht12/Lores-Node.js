var express = require("express");
router = express.Router();
methodOverride = require("method-override")
upload = require("../multer");
user = require("../models/user")

router.use(methodOverride("_method"));


router.get("/profile/:id", function(req, res) {
    user.findById(req.params.id, function(err, user) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("profile", { user: user });
        }
    })
})

router.get("/profile/:id/edit", function(req, res) {
    res.render("profileEdit")
})

router.put("/profile/:id", upload.single('image'), function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, function(err, updatedProfile) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            console.log('rew.body',updatedProfile);
            res.redirect("back");
        }
    })
})

module.exports = router;
