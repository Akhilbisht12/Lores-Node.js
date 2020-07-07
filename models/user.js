var mongoose = require("mongoose")
passportLocalMongoose = require("passport-local-mongoose");
var findOrCreate = require('mongoose-findorcreate')

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    highlightwork: String,
    bio:String,
    skills:String,
    languages:String,
    experience:String,
    nationality:String,


    resetPasswordToken: String,
    resetPasswordExpires: Date,
    image: {
        type: String,
        default: "uploads/loresuser.jpg"
    },
    email: String,
    firstName: String,
    lastName: String,
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "team",
        autopopulate : true
    }],
    notification: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "notification"
    }],
    messageNotification: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "messageNotification",
        autopopulate : true
    }],
    earning: {
        type: Number,
        default: 0
    },
    followers: {
        type: Number,
        default: 0
    },
    loresPoints: {
        type: Number,
        default: 0
    },
    loresCredits: {
        type: Number,
        default: 0
    }
});

UserSchema.plugin(passportLocalMongoose,
    { usernameField : 'email'});
UserSchema.plugin(require('mongoose-autopopulate'));
UserSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", UserSchema);