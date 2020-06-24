const teamChatForm = document.getElementById('teamChatForm')
const socket = io();

socket.on('getTeamUser', (user) => {
    socket.emit('teamChat', user);
})

socket.on('printToTeam', (msg) => {
    outputTeamMsg(msg);
})

socket.on('printToSelf', (msg) => {
    outputToSelf(msg)
})


teamChatForm.addEventListener('submit', e => {
    console.log('clicked')
    e.preventDefault();

    // Get message text
    const teamMsg = e.target.elements.teamMsg.value;
    console.log(teamMsg)

    // Emit message to server
    socket.emit('teamChatMessage', teamMsg);

    // Clear input
    e.target.elements.teamMsg.value = '';
    e.target.elements.teamMsg.focus();
});

function outputTeamMsg(msg) {
    const div = document.createElement('div');
    div.classList.add('media', 'w-50', 'mb-3');
    div.innerHTML = `<img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" class="rounded-circle">
    <div class="media-body ml-3">
        <h5 class="mb-0">${msg.sendUser}</h5>
        <div class="bg-light rounded py-2 px-3 mb-2">
            <p class="text-small mb-0 text-muted">${msg.msg}</p>
        </div>
        <p class="small text-muted">12:00 PM | Aug 13</p>
    </div>`;
    document.querySelector('#teamMessagediv').appendChild(div);
}

function outputToSelf(msg) {
    const div = document.createElement('div');
    div.classList.add('media', 'w-50', 'ml-auto', 'mb-3');
    div.innerHTML = ` <div class="media-body">
    <div class="bg-primary rounded py-2 px-3 mb-2">
        <p class="text-small mb-0 text-white">${msg.msg}</p>
    </div>
    <p class="small text-muted">12:00 PM | Aug 13</p>
</div>`;
    document.querySelector('#teamMessagediv').appendChild(div);
}