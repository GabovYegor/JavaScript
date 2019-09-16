function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/') // переход оюратно на welcome
  }
}

module.exports = authenticationMiddleware