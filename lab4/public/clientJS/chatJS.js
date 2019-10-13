$(function () {
    var socket = io()
    socket.on('connect', function () {
        addTextToClient('You in chat.', 'addedMessage')
    })

    socket.on('user connected', function (msg) {
        addTextToClient(msg + ' connected', 'receivedMessage')
    });

    socket.on('user disconnected', function (msg) {
        addTextToClient(msg + ' disconnected', 'receivedMessage')
    });

    socket.on('message', function (msg) {
        addTextToClient(msg, 'receivedMessage')
    })

    $('#sendBtn').click(function () {
        sendInput = document.getElementById('sendInput')
        mainDiv = document.getElementById('msgField')
        socket.emit('message', document.getElementById('userName').innerText + ': ' + sendInput.value)
        addTextToClient(sendInput.value, 'addedMessage')
        sendInput.value = ''
        mainDiv.scrollTop = mainDiv.scrollHeight
    })

    function addTextToClient(msg, classId) {
        newTextLine = document.createElement('div')
        newTextLine.innerText = msg
        newTextLine.id = classId
        document.getElementById('msgField').appendChild(newTextLine)
    }
})

