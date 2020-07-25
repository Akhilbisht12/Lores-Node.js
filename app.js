// requiring all node modules into variables
var express = require("express")
mongoose = require("mongoose")
bodyParser = require("body-parser")
passport = require("passport")
item = require("./models/item")
User = require("./models/user")
multer = require("multer")
upload = require("./multer")
seedDB = require("./seeds")
feedPost = require("./models/feedPost")
Comments = require("./models/comments")
LocalStratergy = require("passport-local")
expressSanitizer = require("express-sanitizer")
methodOverride = require("method-override")
feedRoutes = require("./routes/feeds")
commentRoutes = require("./routes/comments")
authenticationRoutes = require("./routes/authentication")
marketRoutes = require("./routes/market");
teamRoutes = require('./routes/team');
nodemailer = require('nodemailer');
bcrypt = require('bcryptjs');
cookieParser = require('cookie-parser');
cookieSession = require('cookie-session')

const app = express();
const path = require('path');

// variables for socket.io
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// importing socket functions from utils
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
    notifyUser,
    getChatTitle
} = require('./utils/users');

const {
    getNotificationUser,
    sendNotificationUser,
    formatNotification
} = require('./utils/notification');

const {
    getTeamUser,
    printMsg,
    getTeamRoom,
    teamOldMessage
} = require('./utils/teamChat')
const engagementAlgos = require("./algorithms/engagement")

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


// Connection Database
// mongoose.connect("mongodb://localhost/loresUsers", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb+srv://akhil:Akhil@8979@lores-owlah.mongodb.net/<dbname>?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", function() {
    console.log("Database connection Successful");
})




//  Installing these modules
app.use(methodOverride("_method"));
app.set("view engine", "ejs")
app.set('Views', '/app/views');
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitizer());


// requiring routes
app.use(feedRoutes);
app.use(commentRoutes);
app.use(authenticationRoutes);
app.use(marketRoutes);
app.use(teamRoutes);


// algorithm functions
setInterval(engagementAlgos, 30*60000);


// Setting Up routes
app.get("/", function(req, res) {
    res.render("index");
});

app.get("/dashboard", function(req, res) {
    res.render("dashboard", { currentUser: req.user });
    sendNotificationUser(req.user);
})

app.get("/courses", function(req, res) {
    res.render("courses");
})

app.get('/course/:id', function(req, res) {
    res.render('coursePlayer')
})

app.get("/chat", function(req, res) {
    res.render("chat");
})

// header search field
app.post('/search', function(req, res) {
    var text = req.body.headerSearch;
    var temp = text.split(" ");
    User.find({ $or: [{ "firstName": temp[0] }, { "lastName": temp[0] }] }, (err, foundUser) => {
        if (err) {
            console.log(err)
        } else {
            res.render('searchResults', { user: foundUser })
        }
    })
});

app.get('/leaderboard', function(req, res){
    user.find({}).sort({ loresPoints: -1 }).exec(function(err, users){
    if(err){
            console.log(err);
        }else{
            res.render('leaderBoard', {users : users});
        }
    })
})



// Run when client connects
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
                    console.log(message)
                    io.to(user.id).emit('getOldMessage', message)
                });
            } else {
                socket.join(user.room);
                getOldMessage(user).then(message => {
                    if (message !== null) {
                        console.log(message)
                        io.to(user.id).emit('getOldMessage', message)
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
        var notify = formatNotification(user, msg);
        var message = formatMessage(user, msg);
        socket.to(user.room).emit('message', message);
        io.to(socket.id).emit('messageSelf', message);
        if (!checkUser(user)) {
            io.to(user.user2).emit('notifyUser', notify);
        }

    });

    // *********************************************
    // ***********Notification System***************
    // *********************************************

    socket.emit('getNotificationUser', getNotificationUser());

    socket.on('connectUserNotification', user => {
        socket.join(user._id);
    })




    // *********************************************
    // ************Team Chat System*****************
    // *********************************************
    socket.emit('getTeamUser', getTeamUser());
    socket.on('teamChat', (user) => {
        socket.join(user.room);
        teamOldMessage(user.room).then(messages => {
            if (messages !== null) {
                console.log(messages)
                io.to(socket.id).emit('teamOldMessage', messages)
            }
        });
    })
    socket.on('teamChatMessage', (msg) => {
        const room = getTeamRoom();
        var message = printMsg(msg);
        socket.to(room).emit('printToTeam', message);
        io.to(socket.id).emit('printToSelf', message);
    })

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));