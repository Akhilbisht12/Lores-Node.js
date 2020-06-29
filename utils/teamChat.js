var user = require('../models/user')
team = require('../models/team')
var senduser = String;
var room = String;

function sendTeamUser(getuser) {
    room = getuser.team[0];
    senduser = getuser._id;
}

function getTeamUser() {
    return { senduser, room };
}

function printMsg(msg) {
    team.findById(room, function(err, room) {
        var obj = {
            id: senduser,
            message: msg
        }
        console.log(room)
        room.messages.push(obj);
        room.save();
    })
    return { senduser, msg };
}

function getTeamRoom() {
    return room;
}

module.exports = {
    sendTeamUser,
    getTeamUser,
    printMsg,
    getTeamRoom
}