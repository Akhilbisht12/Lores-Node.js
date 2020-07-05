var user = require('../models/user');
var team = require('../models/team');
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

const teamOldMessage = room => new Promise((resolve, reject) => {
    team.findById(room, (err, foundMsg) => {
        if (err) return reject(err);
        resolve(foundMsg);
    })
});


module.exports = {
    sendTeamUser,
    getTeamUser,
    printMsg,
    getTeamRoom,
    teamOldMessage
}