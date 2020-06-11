var mongoose = require("mongoose");

feedPostSchema = mongoose.Schema({
    // UserId: String,
    feedText: String,
    feedImage: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String,
        image: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments"
    }],

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'like'
    }]
});

module.exports = mongoose.model("feedPost", feedPostSchema);