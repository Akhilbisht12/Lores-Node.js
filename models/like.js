var mongoose = require("mongoose");

var likeSchema = mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }
});
likeSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model("likes", likeSchema);