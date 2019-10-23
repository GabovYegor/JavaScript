const fs = require('fs');
const AuctionSettings = require('./auctionSettings')

class DataBase {
    constructor(){
        try {
            let db = JSON.parse(fs.readFileSync('../../DataBase.json'))
            this.pictures = db.pictures
            this.users = db.users
            this.auctionSettings = db.auctionSettings
        }
        catch (e) {
            console.log("Init DataBase")
            this.pictures = []
            this.users = []
            this.auctionSettings = new AuctionSettings
            this.updateDataBase()
        }
    }

    addPictureToDataBase(newPicture){
        this.pictures.push(newPicture)
        this.updateDataBase()
    }

    addUserToDataBase(newUser){
        this.users.push(newUser)
        this.updateDataBase()
    }

    getPictureByID(ID){
        for(let picture of this.pictures)
            if(picture.ID == ID)
                return picture
    }

    changePicture(newPicture){
        for(let i = 0; i < this.pictures.length; ++i)
            if(this.pictures[i].ID == newPicture.ID)
                this.pictures[i] = newPicture
        this.updateDataBase()
    }

    changeUser(newUser){
        for(let i = 0; i < this.users.length; ++i)
            if(this.users[i].ID == newUser.ID)
                this.users[i] = newUser
        this.updateDataBase()
    }

    getPictureNumder(){
        return this.pictures.length;
    }

    getUserNumder(){
        return this.users.length;
    }

    getPicturesMas(){
        return this.pictures
    }

    getUsersMas(){
        return this.users
    }

    removePictureFromDataBaseByID(ID){
        for(let i = 0; i < this.pictures.length; ++i)
            if(this.pictures[i].ID == ID)
                this.pictures.splice(i, 1)
        this.updateDataBase()
    }

    removeUserFromDataBaseByID(ID){
        for(let i = 0; i < this.users.length; ++i)
            if(this.users[i].ID == ID)
                this.users.splice(i, 1)
        this.updateDataBase()
    }

    pictureActionAuctionByID(ID){
        for(let i = 0; i < this.pictures.length; ++i)
            if(this.pictures[i].ID == ID)
                this.pictures[i].isInAuction = !this.pictures[i].isInAuction;
        this.updateDataBase()
    }

    userActionAuctionByID(ID){
        for(let i = 0; i < this.users.length; ++i)
            if(this.users[i].ID == ID)
                this.users[i].isInAuction = !this.users[i].isInAuction;
        this.updateDataBase()
    }

    setUpAuction(newAuctionSetting){
        for(let setting in this.auctionSettings)
            if (setting == Object.keys(newAuctionSetting)[0])
                this.auctionSettings[setting] = newAuctionSetting[Object.keys(newAuctionSetting)[0]]
        this.updateDataBase()
    }

    getAuctionSetting(){
        return this.auctionSettings
    }

    updateDataBase(){
        fs.writeFileSync('../../DataBase.json', JSON.stringify({ pictures: this.pictures, users: this.users, auctionSettings: this.auctionSettings }))
    }
}

module.exports = DataBase