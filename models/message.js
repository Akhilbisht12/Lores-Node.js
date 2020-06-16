var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    user: {
        author: String,
        chat: [{
            msg: String
        }]
    }
})