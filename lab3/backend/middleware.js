const fs = require('fs');
const DataBase = require('./DataBase/DataBase')
const Picture  = require('./DataBase/Picture')
const User     = require('./DataBase/User')

function loadAuctionSettingsPage(req, res){
    res.render('auctionSettingsPage', {
        auctionSettings: (new DataBase()).getAuctionSetting()
    })
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
    if(!fs.existsSync('../public/images/' + req.body.image) || !req.body.image.length)
        imagePath = '/public/images/default.png'
    else
        imagePath = '/public/images/' + req.body.image;

    (new DataBase()).addPictureToDataBase(new Picture(imagePath, req.body.title, req.body.author, req.body.description, req.body.startPrice))
    res.json({id : (new DataBase().getPicturesMas()[(new DataBase().getPictureNumder()) - 1].ID), imagePath: imagePath})
}

function addUserAction(req, res) {
    (new DataBase()).addUserToDataBase(new User(req.body.userName, req.body.amountOfMoney))
    res.json((new DataBase().getUsersMas()[(new DataBase().getUserNumder() - 1)].ID))
}

function removePictureAction(req, res){
    db = new DataBase()
    db.removePictureFromDataBaseByID(req.body.id)
    res.redirect('/picturesListPage')
}

function removeUserAction(req, res){
    db = new DataBase()
    db.removeUserFromDataBaseByID(req.body.id)
    res.redirect('/userListPage')
}

function loadPictureCard(req, res){
    res.render('pictureCardPage', {
        picture: (new DataBase()).getPictureByID(req.params.id)
    })
}

function changePictureAction(req, res){
    (new DataBase()).changePicture(new Picture(req.body.imagePath, req.body.title, req.body.author, req.body.description, req.body.startPrice, false, req.body.ID))
    res.redirect('/loadPictureCard/' + req.body.ID)
}

function changeUserAction(req, res){
    (new DataBase()).changeUser(new User(req.body.userName, req.body.amountOfMoney,false, req.body.ID))
    res.sendStatus(200)
}

function addPictureToAuction(req, res){
    (new DataBase()).pictureActionAuctionByID(req.params.id)
    res.redirect('/loadPictureCard/' + req.params.id)
}

function addUserToAuction(req, res){
    (new DataBase()).userActionAuctionByID(req.params.id)
    res.sendStatus(200)
}

function setUpAuction(req, res){
    (new DataBase()).setUpAuction(req.body)
    res.sendStatus(200)
}

module.exports = {
    loadPictureListPage: loadPictureListPage,
    loadUserListPage: loadUserListPage,
    loadAddPicturePage: loadAddPicturePage,
    loadAddUserPage: loadAddUserPage,
    addPictureAction: addPictureAction,
    addUserAction: addUserAction,
    removePictureAction: removePictureAction,
    removeUserAction: removeUserAction,
    loadPictureCard: loadPictureCard,
    changePictureAction: changePictureAction,
    changeUserAction: changeUserAction,
    loadAuctionSettingsPage: loadAuctionSettingsPage,
    pictureActionAuction: addPictureToAuction,
    userActionAuction: addUserToAuction,
    setUpAuction: setUpAuction
}