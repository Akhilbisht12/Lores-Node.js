var mongoose = require("mongoose");
var coursedb = require('./models/course');


var courses = [{
    name: 'Adobe Illustrator Beginner Course',
    desc: "This course will lead you towards the complete understanding of abode illustrator from basic to advance. By the end of this project you will be able to create illustration and logos by yourself",
    author: "youtube/Udemy",
    playlist: [{
        name : "Why Learn Illustrator | Introduction",
        embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/G6rgfiGk4y8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
        name : "Changes to User Interface in CC 2018",
        embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/9NDnN60glCs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
        name : "Illustrator Documents",
        embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/wH80HjSJ74U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
        name : "Artboards in adobe illustrator cc ",
        embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/wH80HjSJ74U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
        name : "Changes to User Interface in CC 2018",
        embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/9NDnN60glCs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    
],
    category: 'Designing',
    tags: [{
        tagName: 'Adobe'
    },
    {
        tagName: 'Illustrator'
    },
    {
        tagName: 'Designing'
    }
],
    reviews: [
]
}]

function seedDB(){

courses.forEach(course => {
    coursedb.create(course, function(err, created){
        if(err){
            console.log(err)
        }else{
            console.log(created)
        }
    });
});   

}

module.exports = seedDB;