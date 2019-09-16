const passport = require('passport')
const fileWork = require('../DataBase/workWithDataBase')
const bcrypt = require('bcrypt')

function initUser (app) {
  app.get('/', renderWelcome)
  app.get('/profile', passport.authenticationMiddleware(), renderProfile)
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }))
  app.post('/', userRegistration)
}

// Здесь зарегать пользователя
function userRegistration(req, res) {
    let user = {
        role: 'user',
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }

    fileWork.writeDataToFile('./app/DataBase/DataBase.json', user)
    res.render('authificationWindow')
}

function renderWelcome (req, res) {
//  res.render('user/welcome')
  res.render('authificationWindow')
}

function renderProfile (req, res) {
  // res.render('user/profile', {
  //   username: req.user.username
  // })
    let book1 = {
        role: 'book',
        name: 'boooooOOk',
        id: '123'
    }

    let book2 = {
        role: 'book',
        name: 'Hello',
        id: '35'
    }

    let book3 = {
        role: 'book',
        name: 'World !!!',
        id: '21'
    }

    fileWork.writeDataToFile('./app/DataBase/DataBase.json', book1)
    fileWork.writeDataToFile('./app/DataBase/DataBase.json', book2)
    fileWork.writeDataToFile('./app/DataBase/DataBase.json', book3)
    console.log(fileWork.getBooks('./app/DataBase/DataBase.json'))

    res.render('userProfile', {
        mas: fileWork.getBooks('./app/DataBase/DataBase.json')
    })
}

module.exports = initUser

