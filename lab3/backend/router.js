const express = require('express')
const router = express.Router()
const middleware = require('./middleware')

router.get('/', middleware.loadMainPage)
router.get('/addPicturePage', middleware.loadAddPicturePage)
router.post('/addPictureAction', middleware.addPictureAction)
router.post('/removePictureAction', middleware.removePictureAction)
router.get('/loadPictureCard/:id', middleware.loadPictureCard)
router.post('/changePictureAction', middleware.changePictureAction)

module.exports = router