var mongoose = require('mongoose')
user = require('../models/user')


var teamSchema = mongoose.Schema({
    name: String,
    description: String,
    members: [{
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    messages: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        message: String
    }]

})
teamSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model("team", teamSchema);