var mongoose = require("mongoose");
var feedPost = require("./models/feedPost");
var comments = require("./models/comments");
var user = require("./models/user");

var posts = [{
        feedText: "This is the new feed Text that i am trying to put in the feedPost Section",
        feedImage: "https://cdn.pixabay.com/photo/2020/05/02/00/14/museum-of-science-and-industry-5119410__340.jpg"
    },
    {
        feedText: "This is the second feed Text that i am trying to put in the feedPost Section",
        feedImage: "https://cdn.pixabay.com/photo/2020/05/17/13/57/the-sea-5181726__340.jpg"
    }
]

function seedDB() {
    feedPost.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("Posts Removed");

    });
    comments.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
    });
    user.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
    })
}

module.exports = seedDB;