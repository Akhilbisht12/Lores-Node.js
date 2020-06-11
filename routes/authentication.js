var express = require("express")
router = express.Router()
User = require("../models/user")
passport = require("../passport");


// Authentication Routes

// signup route
router.get("/register", function(req, res) {
    res.render("register");
});

// signup logic
router.post("/register", function(req, res) {
    var newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email
    });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/dashboard");
        })
    })
})

// login route
router.get("/login", function(req, res) {
    res.render("login")
})

// login logic route
router.post("/login", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
}), function(req, res) {})

// logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");

});

router.get("/forgotPassword", function(req, res) {
    res.render("forgot-password");
})



module.exports = router;