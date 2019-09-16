//const app = require('./app')
const fileWork = require('./app/DataBase/workWithDataBase')
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'pug');
app.set('views', './views')
require('./app/authentication').init()
require('./app/user').init(app)
require('./app/note').init(app)

// Админ не реализован
fileWork.initDataBase('./app/DataBase/DataBase.json', [ { role: 'admin', username: 'admin', password: 'admin' } ])

//module.exports = app

const port = process.env.PORT || 8080

app.listen(port, function (err) {
  if (err) {
    throw err
  }

  console.log(`server is listening on ${port}...`)
})
