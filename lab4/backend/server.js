const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server);

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', require('express').static('../public'));
app.set('view engine', 'pug');
app.set('views', '../views')
app.use('/', require('./router'))

io.on('connection', function (socket) {
    console.log('connection', socket.id)
    socket.broadcast.emit('user connected', 'user with id: ' + socket.id + ' connected')
    socket.on('message', function (msg) {
        socket.broadcast.emit('message', msg)
    })
});

port = 8080
server.listen(port, ()=> { console.log('Server worked in', port, 'port!!!') })

