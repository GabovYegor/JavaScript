class Picture{
    constructor(imagePath = '/public/images/default.png', title = "defaultTitle", author = "defaultAuthor", description = "defaultDescription",
                startPrice = 0, holder = '', finishPrice = 0){
        this.imagePath = imagePath
        this.title = title
        this.author = author
        this.description = description
        this.startPrice = startPrice
        this.socketID = 0 // isnt used
        this.holder = holder
        this.finishPrice = finishPrice
    }
}

module.exports = Picture