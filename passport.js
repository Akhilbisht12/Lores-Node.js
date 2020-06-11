var express = require("express")
router = express.Router()
passport = require("passport")
LocalStratergy = require("passport-local")

// passport Configurations
router.use(require("express-session")({
    secret: "This is the website for lores.in",
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// sending user information to every route
router.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

module.exports = passport;