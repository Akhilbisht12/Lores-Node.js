var mongoose = require('mongoose');
var userdb = require("../models/user");
const users = [];

// Join user to chat
function userJoin(id, username, user2) {
    var room = username + "!@!@2@!@!" + user2;
    userdb.findById(username, function(err, founduser) {})
    const user = {
        id,
        username,
        room,
        user2
    };

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