const express = require('express')
const router = express.Router()
const middleware = require('./middleware')

router.get('/', middleware.loadAuctionSettingsPage)
router.get('/picturesListPage', middleware.loadPictureListPage)
router.get('/userListPage', middleware.loadUserListPage)
router.get('/addPicturePage', middleware.loadAddPicturePage)
router.get('/addUserPage', middleware.loadAddUserPage)
router.post('/addPictureAction', middleware.addPictureAction)
router.post('/addUserAction', middleware.addUserAction)
router.post('/removePictureAction', middleware.removePictureAction)
router.get('/loadPictureCard/:id', middleware.loadPictureCard)
router.post('/changePictureAction', middleware.changePictureAction)
router.post('/changeUserAction', middleware.changeUserAction)
router.get('/addPictureToAuction/:id', middleware.addPictureToAuction)

module.exports = router