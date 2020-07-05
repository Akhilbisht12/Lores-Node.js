var mongoose = require('mongoose')

var messageSchema = mongoose.Schema({
    room: String,
    message: [{
        sender: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                autopopulate: true
            },
            msg: String
        }
    }]
});
messageSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model("message", messageSchema);