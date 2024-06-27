(function connect() {
    let socket = io.connect("http://localhost:3000");

    // เปลี่ยน username
    let username = document.querySelector('#username');
    let usernameSubmit = document.querySelector('#usernameSubmit');
    let curUsername = document.querySelector('.card-header');
    usernameSubmit.addEventListener('submit', e => {
        console.log(username.value);
        socket.emit('change_username', { username: username.value })
        curUsername.textContent = username.value 
        username.value = ''
    }) 

    // ส่งข้อความ
    let message = document.querySelector('#message');
    let messageSubmit = document.querySelector('#messageSubmit');
    let messageList = document.querySelector('#message-list');
    messageSubmit.addEventListener('submit', e => {
        console.log(message.value)
        socket.emit('new_message', { message: message.value})
        message.value = ''
    })

    // add ข้อความที่ส่งไปแล้ว
    socket.on('receive_message', data => {
        console.log(data)
        let listItem = document.createElement('li')
        listItem.textContent = data.username + ": " + data.message;
        listItem.classList.add('list-group-item');
        messageList.appendChild(listItem) 
    })


    let info = document.querySelector('.info');
    message.addEventListener('keypress', e => {
        socket.emit('typing');
    });
    socket.on('typing', data => {
        info.textContent = data.username + " กำลังพิมพ์...";
        setTimeout(() => { info.textContent = ''}, 5000)
    });
})();