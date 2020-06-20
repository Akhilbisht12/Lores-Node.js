const chatMessages = document.querySelector('#messageCenter');

const socket = io();


socket.on('getNotificationUser', user => {
    socket.emit('connectUserNotification', user);
})

socket.on('notifyUser', (notify) => {
    console.log('user notified')
    notifyUser(notify);
})

function notifyUser(notify) {
    const a = document.createElement('a');
    a.classList.add('dropdown-item', 'd-flex', 'align-items-center');
    a.innerHTML = ` <div class="dropdown-list-image mr-3">
    <img class="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="">
    <div class="status-indicator bg-success"></div>
</div>
<div class="font-weight-bold">
    <div class="text-truncate">${notify.msg}</div>
    <div class="small text-gray-500">${notify.username} · ${notify.time}</div>
</div>`;
    document.querySelector('#messageCenter').appendChild(a);
}