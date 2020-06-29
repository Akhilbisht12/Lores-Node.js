const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
// socket.on('roomUsers', ({ room, users }) => {
//     outputRoomName(room);
//     outputUsers(users);
// });

// Message from server
socket.on('messageSelf', message => {
    console.log(message);
    outputMessageSelf(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('checkUser', isUser => {
    console.log(isUser);
})

socket.on('getOldMessage', oldMsg => {
    console.log(oldMsg);
    outputOldMessages(oldMsg);
})

socket.on('chatTitle', chatTitle => {
    var chatUser = document.getElementById('#chatUser');
    chatUser.innerHTML - `${chatTitle}`
})

// Message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;

    // Emit message to server
    socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessageSelf(message) {
    const div = document.createElement('div');
    div.classList.add('media', 'w-50', 'ml-auto', 'mb-3');
    div.innerHTML = ` <div class="media-body">
    <div class="bg-primary rounded py-2 px-3 mb-2">
        <p class="text-small mb-0 text-white">${message.text}</p>
    </div>
    <p class="small text-muted">${message.time} | Aug 13</p>
</div>`;
    document.querySelector('.chat-messages').appendChild(div);
}

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('media', 'w-50', 'mb-3');
    div.innerHTML = `<img src="${msg.sender.id.image}" alt="user" width="30" class="rounded-circle">
    <div class="media-body ml-3">
        <div class="bg-light rounded py-2 px-3 mb-2">
            <h6 class="mb-0">${message.username}</h6>
            <p class="text-small mb-0 text-muted">${message.text}</p>
        </div>
        <p class="small text-muted">${message.time} | Aug 13</p>
    </div>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
  `;
}

function outputOldMessages(oldMsg){
    var name = String;
    oldMsg.message.forEach(msg => {
        if(msg.sender.id._id === username){
    const div = document.createElement('div');
    div.classList.add('media', 'w-50', 'ml-auto', 'mb-3');
    div.innerHTML = ` <div class="media-body">
    <div class="bg-primary rounded py-2 px-3 mb-2">
        <p class="text-small mb-0 text-white">${msg.sender.msg}</p>
    </div>
    <p class="small text-muted">${msg.sender.time} | Aug 13</p>
</div>`;
    document.querySelector('.chat-messages').appendChild(div);
        }else{ 
            name = msg.sender.id.username;
            const div = document.createElement('div');
            div.classList.add('media', 'w-50', 'mb-3');
            div.innerHTML = `<img src="${msg.sender.id.image}" alt="user" width="30" class="rounded-circle">
            <div class="media-body ml-3">
                <div class="bg-light rounded py-2 px-3 mb-2">
                    <h6 class="mb-0">${msg.sender.id.username}</h6>
                    <p class="text-small mb-0 text-muted">${msg.sender.msg}</p>
                </div>
                <p class="small text-muted">${msg.sender.time} | Aug 13</p>
            </div>`;
            document.querySelector('.chat-messages').appendChild(div);
        }
        var chatUser = document.getElementById('chatUser');
        chatUser.innerHTML = `${name}`;
});
chatMessages.scrollTop = chatMessages.scrollHeight;

}