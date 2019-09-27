const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const fileWork = require('./workWithDataBase')

function findUser (username, callback) {
  db = new fileWork.DataBase()
  users = db.getUsers()
  for (user of users){
    if (username === user.username) {
      return callback(null, user)
    }
  }
  return callback(null)
}

// для функции библиотеки passport
passport.serializeUser(function (user, cb) { cb(null, user.username) })
passport.deserializeUser(function (username, cb) { findUser(username, cb) })

function initPassport () {
  passport.use(new LocalStrategy(
      (username, password, done) => {
        findUser(username, (err, user) => {
          if (err)
            return done(err)

          if (!user)
            return done(null, false)

          bcrypt.compare(password, user.password, (err, isValid) => {
            if (err)
              return done(err)
            if (!isValid)
              return done(null, false)
            return done(null, user)
          })
        })
      }
  ))

  passport.authenticationMiddleware = authenticationMiddleware
}

function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/') // переход оюратно на welcome
  }
}

module.exports = {
  authenticationMiddleware: authenticationMiddleware,
  initPassport: initPassport
}
