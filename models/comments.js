var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String,
        image: String
    }
});
const commentSchema2 = mongoose.Schema({ comment: commentSchema });
commentSchema2.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model("comments", commentSchema2);