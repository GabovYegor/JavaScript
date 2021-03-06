const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static('../public'));
app.set('view engine', 'pug');
app.set('views', '../views')
app.use('/', require('./router'))

port = 8080
app.listen(port, function (err) {
    if (err) {
        throw err
    }
    console.log(`server is listening on `, port)
})

