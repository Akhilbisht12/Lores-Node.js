var mongoose = require("mongoose");

var likeSchema = mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }
});

module.exports = mongoose.model("likes", likeSchema);