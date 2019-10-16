const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server);
const DataBase = require('./DataBase/DataBase')
const bodyParser = require('body-parser')
let Raven = require('raven')

Raven.config('https://94a970f3fb5a476398675801874e7c39@sentry.io/1772410')
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', require('express').static('../public'));
app.set('view engine', 'pug');
app.set('views', '../views')
app.use('/', require('./router'))
init = (new DataBase(true))
port = 8080
server.listen(port, ()=> { console.log('Server worked in', port, 'port!!!') })

timeToWatchPicture = Number(init.auctionSettings.timeToExplore)
timeToBargain = Number(init.auctionSettings.timeToBargain)

timeToOtherUsers = 0
isFirstHere = false
var maxBet = 0
var maxBetUserId = ''

io.on('connection', function (socket) {
    console.log('user with ', socket.id, 'connected')
    let db = new DataBase(false)
    db.getSocketIdToUser(socket.id)
    try {
        socket.broadcast.emit('user connected', db.getUserBySocketId(socket.id).userName)
    }
    catch (e) {
        console.log('user connection error')
        Raven.captureMessage('user connection error')
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
            Raven.captureMessage('disconect error !!!')
        }
    })

    socket.on('makeBet', function (userId, bet) {
        let newDb = new DataBase(false)
        socket.broadcast.emit('message', newDb.getUserBySocketId(userId).userName + ' make bet: ' + bet)
        if(Number(maxBet) < Number(bet)) {
            maxBet = bet
            maxBetUserId = userId
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

    let pictureIter = 0
    function sendPicturesToUsers(pictures) {
        if(pictureIter == pictures.length) {
            resultOfCurrentBargain(pictures[pictureIter - 1])
            clearInterval(pictureIntervalDescriptor)
            socket.emit('bargain end', 'bargain end')
            socket.broadcast.emit('bargain end', 'bargain end')
            console.log('Picture end')
        }
        else{
            try {
                console.log('try result of current bargain iter =', pictureIter)
                resultOfCurrentBargain(pictures[pictureIter - 1])
            }
            catch (e) {
                console.log('planning index error')
                Raven.captureMessage('planing error')
            }
            socket.emit('time to watch', pictures[pictureIter], 'time to watch picture', timeToWatchPicture)
            socket.broadcast.emit('time to watch', pictures[pictureIter], 'time to watch picture', timeToWatchPicture)
            setTimeout(startBargain, timeToWatchPicture * 1000, pictures[pictureIter++])
        }
    }

    function startBargain(picture) {
        socket.emit('startBargain', picture, 'bargain starts', timeToBargain)
        socket.broadcast.emit('startBargain', picture, 'bargain starts', timeToBargain)
    }

    function resultOfCurrentBargain(picture) {
        let newDb = new DataBase(false)
        if(maxBet == 0){
            socket.emit('resultOfCurrentBargain', picture.title + ' isnt sold')
            socket.broadcast.emit('resultOfCurrentBargain', picture.title + ' isnt sold')
            socket.emit('updatePictureHolder', 'no one buy this picture', picture.title, false)
            socket.broadcast.emit('updatePictureHolder', 'no one buy this picture', picture.title, false)
        }
        else{
            socket.emit('resultOfCurrentBargain', newDb.getUserBySocketId(maxBetUserId).userName + ' bought a ' +  picture.title + ' for ' + maxBet)
            socket.broadcast.emit('resultOfCurrentBargain', newDb.getUserBySocketId(maxBetUserId).userName + ' bought a ' +  picture.title + ' for ' + maxBet)
            socket.emit('updatePictureHolder', newDb.getUserBySocketId(maxBetUserId).userName, picture.title, true)
            socket.broadcast.emit('updatePictureHolder', newDb.getUserBySocketId(maxBetUserId).userName, picture.title, true)

            newDb.updateUserPictures(maxBetUserId, picture, maxBet)
            newDb.updatePictureHolder(picture, maxBetUserId)
            money = newDb.getUserBySocketId(maxBetUserId).amountOfMoney
            console.log('AMOUNT OF MONEY: ', money)
            io.sockets.sockets[maxBetUserId].emit('update money', money, picture);
            socket.emit('updateUserAtAdmin', newDb.getUserBySocketId(maxBetUserId).userName, money)
            socket.broadcast.emit('updateUserAtAdmin', newDb.getUserBySocketId(maxBetUserId).userName, money)
        }
        console.log('init current bet ...')
        maxBet = 0
        maxBetUserId = 0
    }
});