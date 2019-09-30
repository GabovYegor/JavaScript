const DataBase = require('./DataBase/DataBase')
const Picture = require('./DataBase/Picture')

function loadMainPage(req, res) {
    res.render('picturesListPage', {
        pictures: (new DataBase()).getPicturesMas()
    })
}

function loadAddPicturePage(req, res){
    res.render('addPicturePage')
}

function addPictureAction(req, res) {
    let imagePath = req.body.image
    if (!imagePath.length) { imagePath = 'default.png' }
    (new DataBase()).addPictureToDataBase(new Picture('/public/images/' + imagePath, req.body.title, req.body.author))
    res.redirect('/')
}

function removePictureAction(req, res){
    db = new DataBase()
    db.removePictureFromDataBaseByID(req.body.id)
    res.redirect('/')
}

function loadPictureCard(req, res){
    res.render('pictureCard', {
        picture: (new DataBase()).getPictureByID(req.params.id)
    })
}

function changePictureAction(req, res){
    (new DataBase()).changePicture(new Picture(req.body.imagePath, req.body.title, req.body.author, false, req.body.ID))
    res.redirect('/loadPictureCard/' + req.body.ID)
}

module.exports = {
    loadMainPage: loadMainPage,
    loadAddPicturePage: loadAddPicturePage,
    addPictureAction: addPictureAction,
    removePictureAction: removePictureAction,
    loadPictureCard: loadPictureCard,
    changePictureAction: changePictureAction
}