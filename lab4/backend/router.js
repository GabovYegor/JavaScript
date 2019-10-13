const express = require('express')
const middware = require('./middleware')
router = express.Router()

router.get('/', (req, res)=> {res.render('registrationPage')})
router.post('/admin', middware.admin)
router.post('/chat', middware.userRegistration)

module.exports = router