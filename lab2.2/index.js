//const app = require('./app')
const fileWork = require('./workWithDataBase')
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
require('./authentification').initPassport()
require('./user').initUser(app)

fileWork.initDataBase()
db = new fileWork.DataBase()
db.addBook(new fileWork.Book('Пушкин', 'Евгений Онегин'))
db.addBook(new fileWork.Book('Толстой', 'Война и Мир'))
db.addBook(new fileWork.Book('Габов', 'Паттерны проектирования'))

const port = process.env.PORT || 8080

app.listen(port, function (err) {
  if (err) {
    throw err
  }

  console.log(`server is listening on ${port}...`)
})
