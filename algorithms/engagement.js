var posts = require('../models/feedPost')

function engagementAlgo(){
    posts.find({},function(err, found){
        if(err){
            console.log(err)
        }else{
            found.forEach(function(post){
                var eng = post.comments.length + post.likes.length;
                post.engagement[0] = eng;
                post.save();
            })
        }
    })
}

module.exports = engagementAlgo;