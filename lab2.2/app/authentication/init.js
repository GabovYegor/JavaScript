const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const authenticationMiddleware = require('./middleware')
const fileWork = require('../DataBase/workWithDataBase')

function findUser (username, callback) {
  users = fileWork.getUsers('./app/DataBase/DataBase.json')
  for (user of users){
      if (username === user.username) {
        return callback(null, user)
      }
  }
  return callback(null)
}

// для функции библиотеки passport
passport.serializeUser(function (user, cb) {
  cb(null, user.username)
})

// для функции библиотеки passport
passport.deserializeUser(function (username, cb) {
  findUser(username, cb)
})

function initPassport () {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      findUser(username, (err, user) => {
        if (err) {
          return done(err)
        }

        // User not found
        if (!user) {
          console.log('User not found')
          return done(null, false)
        }

        bcrypt.compare(password, user.password, (err, isValid) => {
          if (err) {
            return done(err)
          }
          if (!isValid) {
            return done(null, false)
          }
          return done(null, user)
        })
      })
    }
  ))

  passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport