const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server);
const DataBase = require('./DataBase/DataBase')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', require('express').static('../public'));
app.set('view engine', 'pug');
app.set('views', '../views')
app.use('/', require('./router'))
init = (new DataBase(true))
port = 8001
server.listen(port, ()=> { console.log('Server worked in', port, 'port!!!') })

timeToWatchPicture = 5
timeToBargain = 10
timeToOtherUsers = 0

isFirstHere = false
io.on('connection', function (socket) {
    console.log('user with ', socket.id, 'connected')
    let db = new DataBase(false)
    db.getSocketIdToUser(socket.id)

    try {
        socket.broadcast.emit('user connected', db.getUserBySocketId(socket.id).userName)
    }
    catch (e) {
        console.log('user connection error')
    }

    socket.on('message', function (msg) {
        socket.broadcast.emit('message', msg)
    })

    socket.on('disconnect', function (msg) {
        user = db.getUserBySocketId(socket.id)
        try {
            db.disconnectUser(user)
            console.log(user.userName, 'disconnect')
            socket.broadcast.emit('user disconnected', user.userName)
        }
        catch (e) {
            console.log('disconnect error !!! No such user')
        }
    })

    var pictureIntervalDescriptor = 0
    if(!isFirstHere) {
        emitAboutStart()
        isFirstHere = true
    }
    else{
        socket.emit('startTime', Math.ceil(timeToOtherUsers / 1000 + timeToWatchPicture + timeToBargain - (new Date).getTime() / 1000) - 1)
    }

    function emitAboutStart() {
        timeToOtherUsers = (new Date).getTime()
        socket.emit('startTime', timeToWatchPicture + timeToBargain)
        pictures = db.getPictures()
        pictureIntervalDescriptor = setInterval(sendPicturesToUsers, (timeToWatchPicture + timeToBargain) * 1000, pictures)
    }

    let pictireIter = 0
    function sendPicturesToUsers(pictures) {
        if(pictireIter == pictures.length) {
            clearInterval(pictureIntervalDescriptor)
            socket.emit('bargain end', 'bargain end')
            socket.broadcast.emit('bargain end', 'bargain end')
            console.log('Picture end')
        }
        else{
            socket.emit('time to watch', pictures[pictireIter], 'time to watch picture', timeToWatchPicture)
            socket.broadcast.emit('time to watch', pictures[pictireIter], 'time to watch picture', timeToWatchPicture)
            setTimeout(startBargain, timeToWatchPicture * 1000, pictures[pictireIter++])
        }
    }

    function startBargain(picture) {
        socket.emit('startBargain', picture, 'bargain starts', timeToBargain)
        socket.broadcast.emit('startBargain', picture, 'bargain starts', timeToBargain)
    }
});

