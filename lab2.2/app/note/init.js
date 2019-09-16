const passport = require('passport')

function initUser (app) {
  app.get('/notes/:id', passport.authenticationMiddleware(), (req, res) => {
    res.render('note/overview', {
      id: req.params.id
    })
  })

  app.get('/mySite2', passport.authenticationMiddleware(), (req, res) => {
    res.render('note/mySite2')
  })
}

module.exports = initUser
