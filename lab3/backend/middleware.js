const DataBase = require('./DataBase/DataBase')
const Picture = require('./DataBase/Picture')
const User= require('./DataBase/User')

function loadAuctionSettingsPage(req, res){
    res.render('auctionSettingsPage')
}

function loadPictureListPage(req, res) {
    res.render('pictureListPage', {
        pictures: (new DataBase()).getPicturesMas()
    })
}

function loadUserListPage(req, res) {
    res.render('userListPage', {
        users: (new DataBase()).getUsersMas()
    })
}

function loadAddPicturePage(req, res){
    res.render('addPicturePage')
}

function loadAddUserPage(req, res) {
    res.render('addUserPage')
}

function addPictureAction(req, res) {
    let imagePath = req.body.image
    if (!imagePath.length) { imagePath = 'default.png' }
    (new DataBase()).addPictureToDataBase(new Picture('/public/images/' + imagePath, req.body.title, req.body.author))
    res.redirect('/picturesListPage')
}

function addUserAction(req, res) {
    (new DataBase()).addUserToDataBase(new User(req.body.userName, req.body.amountOfMoney))
    res.redirect('userListPage')
}

function removePictureAction(req, res){
    db = new DataBase()
    db.removePictureFromDataBaseByID(req.body.id)
    res.redirect('/picturesListPage')
}

function loadPictureCard(req, res){
    res.render('pictureCardPage', {
        picture: (new DataBase()).getPictureByID(req.params.id)
    })
}

function changePictureAction(req, res){
    (new DataBase()).changePicture(new Picture(req.body.imagePath, req.body.title, req.body.author, false, req.body.ID))
    res.redirect('/loadPictureCard/' + req.body.ID)
}

function changeUserAction(req, res){
    (new DataBase()).changeUser(new User(req.body.userName, req.body.amountOfMoney,false, req.body.ID))
    res.status(200)
}

function addPictureToAuction(req, res){
    (new DataBase()).addPictureToAuctionByID(req.params.id)
    res.redirect('/loadPictureCard/' + req.params.id)
}

module.exports = {
    loadPictureListPage: loadPictureListPage,
    loadUserListPage: loadUserListPage,
    loadAddPicturePage: loadAddPicturePage,
    loadAddUserPage: loadAddUserPage,
    addPictureAction: addPictureAction,
    addUserAction: addUserAction,
    removePictureAction: removePictureAction,
    loadPictureCard: loadPictureCard,
    changePictureAction: changePictureAction,
    changeUserAction: changeUserAction,
    loadAuctionSettingsPage: loadAuctionSettingsPage,
    addPictureToAuction: addPictureToAuction
}