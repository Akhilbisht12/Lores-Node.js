console.log('connected')
const socket = io();
socket.on('message', isUser => {
    console.log(isUser);
})