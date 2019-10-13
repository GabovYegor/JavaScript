class Picture{
    constructor(imagePath = '/public/images/default.png', title = "defaultTitle", author = "defaultAuthor", description = "defaultDescription", startPrice = 0, ID = 0){
        this.imagePath = imagePath
        this.title = title
        this.author = author
        this.description = description
        this.startPrice = startPrice
        this.socketID = ID
    }
}

module.exports = Picture