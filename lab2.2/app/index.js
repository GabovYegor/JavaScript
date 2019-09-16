// const fileWork = require('./DataBase/workWithDataBase')
// const express = require('express')
// const bodyParser = require('body-parser')
// const passport = require('passport')
// const session = require('express-session')
// const app = express()
//
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))
// app.use(passport.initialize())
// app.use(passport.session())
//
// app.set('view engine', 'pug');
// app.set('views', './views')
// require('./authentication').init()
// require('./user').init(app)
// require('./note').init(app)
//
// // Админ не реализован
// fileWork.initDataBase('./app/DataBase/DataBase.json', [ { role: 'admin', username: 'admin', password: 'admin' } ])
//
// module.exports = app
