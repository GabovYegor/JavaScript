class Picture{
    constructor(imagePath = '/public/images/default.png', title = "defaultTitle", author = "defaultAuthor", description = "defaultDescription", startPrice = 0){
        this.imagePath = imagePath
        this.title = title
        this.author = author
        this.description = description
        this.startPrice = startPrice
        this.socketID = 0
        this.holder = ''
        this.finishPrice = startPrice
    }
}

module.exports = Picture