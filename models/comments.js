var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    comment: {
        text: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            autopopulate: true
        }
    }
});
commentSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model("comments", commentSchema);