var mongoose = require('mongoose')
userdb = require("../models/user");
const users = [];
const user = {};
var username = String;
var room = String;

// Join user to chat
function userJoin(id, userin, userto) {
    console.log(userin)
    userdb.findById(userin, function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            console.log("success")
            console.log(foundUser);
            username = foundUser.username;
            room = userin + "!@!@2@!@!" + userto;
            console.log(room)
            user = { id, username, room };
        }

    })

    users.push(user);

    return user;
}

// Get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// Get room users
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};