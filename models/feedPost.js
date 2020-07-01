var mongoose = require("mongoose");

feedPostSchema = mongoose.Schema({
    // UserId: String,
    feedText: String,
    feedImage: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            autopopulate: true
        }
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
        autopopulate: true
    }],

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'like'
    }]
});
feedPostSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model("feedPost", feedPostSchema);