// Run when client connects

const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const {
    formatMessage,
    getOldMessage
} = require('./utils/messages');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    checkUser,
    notifyUser
} = require('./utils/users');
const user = require("./models/user")

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName = {
    username: 'Lores Bot'
};


io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        if (username) {
            const roomCheck = user.room;
            const temp = roomCheck.split('!@!@2@!@!').reverse().join('!@!@2@!@!');
            if (io.sockets.adapter.rooms[temp]) {
                user.room = temp;
                socket.join(user.room);
                // console.log("from app .js " + getOldMessage(user));
                getOldMessage(user).then(message => {
                    console.log('from app' + message)
                    io.to(user.room).emit('getOldMessage', message)
                });
            } else {
                socket.join(user.room);
                getOldMessage(user).then(message => {
                    if (message !== null) {
                        console.log("not null")
                        console.log('from app' + message)
                        io.to(user.room).emit('getOldMessage', message)
                    }
                });
            }
        }

        // Welcome current user
        // socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

        // Broadcast when a user connects
        // socket.broadcast
        //     .to(user.room)
        //     .emit(
        //         'message',
        //         formatMessage(botName, `${user.username} has joined the chat`)
        //     );

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user, msg));
        // if (!checkUser(user)) {
        //     notifyUser(user);
        //     io.to(user.room).emit('checkUser', checkUser(user));
        // }

    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            // io.to(user.room).emit(
            //     'message',
            //     formatMessage(botName, `${user.username} has left the chat`)
            // );

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});