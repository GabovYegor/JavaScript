const DataBase = require('./DataBase')
const fs = require('fs');

var getPictureID = (function () {
    var unuqiePictureNumber = (new DataBase()).getPictureNumder() + 1;
    return function () { return unuqiePictureNumber++; }
}) ();

class Picture{
    constructor(imagePath = '/public/images/default.png', title = "defaultTitle", author = "defaultAuthor", description = "defaultDescription",
                startPrice = 0, isInAuction = false, ID = getPictureID()){
        this.imagePath = imagePath
        // if(!fs.existsSync('..' + imagePath)) {
        //     console.log('unable to find file', imagePath)
        //     this.imagePath = '/public/images/default.png'
        // }

        this.title = title
        this.author = author
        this.description = description
        this.startPrice = startPrice
        this.isInAuction = isInAuction
        this.ID = ID
    }
}

module.exports = Picture