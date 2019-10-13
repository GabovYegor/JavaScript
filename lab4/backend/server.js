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
let db = new DataBase(true)
port = 8001
server.listen(port, ()=> { console.log('Server worked in', port, 'port!!!') })

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
        db.disconnectUser(user)
        console.log(user.userName, 'disconnect')
        socket.broadcast.emit('user disconnected', user.userName)
    })
});

