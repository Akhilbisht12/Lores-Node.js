var express = require("express")
router = express.Router()
passport = require("passport")
LocalStratergy = require("passport-local")
var GoogleStrategy = require('passport-google-oauth20').Strategy;
User = require("./models/user")
var findOrCreate = require('mongoose-findorcreate')

// passport Configurations
router.use(require("express-session")({
    secret: "This is the website for lores.in",
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStratergy({
    usernameField: 'email'
  }, User.authenticate()));


  
 /*
  passport.use(new GoogleStrategy({
    clientID:"919682509766-g8bb4d8m3ef5tek2ekgihlv4ns12d2he.apps.googleusercontent.com",
    clientSecret:"9NP6yyoducTm91xYEJ5xL2aA",
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));
  
*/


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// sending user information to every route
router.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

module.exports = passport;