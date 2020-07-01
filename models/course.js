var mongoose = require('mongoose')

var courseSchema = mongoose.Schema({
    name: String,
    desc: String,
    author: String,
    playlist: [{
        embed: String
    }],
    category: String,
    tags: [{
        tagName: String
    }],
    reviews: [{
        author: String,
        comment: String,
        star: Number
    }]
})