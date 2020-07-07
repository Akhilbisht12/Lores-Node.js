var mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');

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
        ref: 'User'
    }],
    engagement :Array
});
feedPostSchema.plugin(mongoosePaginate);
feedPostSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model("feedPost", feedPostSchema);