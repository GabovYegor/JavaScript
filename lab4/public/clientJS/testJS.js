$(function () {
    var socket = io()
    socket.on('connect', function () {
        socket.emit('userConnected', sendInput.value)
        addTextToClient('You in chat. Your id: ' + socket.id, 'addedMessage')
    })

    socket.on('user connected', function (msg) {
        addTextToClient(msg, 'receivedMessage')
    });

    socket.on('message', function (msg) {
        addTextToClient(msg, 'receivedMessage')
    })

    $('#sendButton').click(function () {
        sendInput = document.getElementById('sendInput')
        mainDiv = document.getElementById('mainDiv')
        socket.emit('message', sendInput.value)
        addTextToClient(sendInput.value, 'addedMessage')
        sendInput.value = ''
        mainDiv.scrollTop = mainDiv.scrollHeight
    })

    function addTextToClient(msg, classId) {
        newTextLine = document.createElement('div')
        newTextLine.innerText = msg
        newTextLine.className = 'w3-margin-top'
        newTextLine.id = classId
        document.getElementById('mainDiv').appendChild(newTextLine)
    }
})

