var mongoose = require("mongoose")
passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    },
    email: String,
    firstName: String,
    lastName: String,
    message: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message'
    }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);