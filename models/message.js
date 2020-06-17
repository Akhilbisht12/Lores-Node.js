var mongoose = require('mongoose')

var messageSchema = mongoose.Schema({
    room: String,
    message: [{
        sender: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
            msg: String
        }
    }]
});
module.exports = mongoose.model("message", messageSchema);