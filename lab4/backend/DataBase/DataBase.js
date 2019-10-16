const fs = require('fs');
const User = require('./User')
const Picture = require('./Picture')
let Raven = require('raven')

Raven.config('https://94a970f3fb5a476398675801874e7c39@sentry.io/1772410')
class DataBase {
    constructor(isInitFromSourceDataBase, src = './DataBase/DataBaseCurrent.json') {
        if (isInitFromSourceDataBase) {
            console.log('InitCurrentDataBase ...')
            this.pictures = []
            this.users = []
            try {
                let dbs = JSON.parse(fs.readFileSync('../../DataBase.json'))
                for( let picture of dbs.pictures )
                    if (picture.isInAuction)
                        this.pictures.push(new Picture(picture.imagePath, picture.title, picture.author, picture.description, picture.startPrice))
                //console.log('Pictures in auction: ', this.pictures)
                for( let user of dbs.users )
                    if(user.isInAuction)
                        this.users.push(new User(user.userName, user.amountOfMoney))
                this.users.push(new User('admin'))
                //console.log('Users in auction:', this.users)

                this.auctionSettings = dbs.auctionSettings
                //console.log('Auction settings: ', this.auctionSettings)
                fs.writeFileSync('./DataBase/DataBaseCurrent.json', JSON.stringify({ pictures: this.pictures, users: this.users, auctionSettings: this.auctionSettings }))
                fs.writeFileSync('../../kek')
            } catch (e) {
                console.log('DataBase Source undefined', e)
                Raven.captureMessage('DataBase Source undefined')
            }
        }
        else{
            try {
                let db = JSON.parse(fs.readFileSync(src))
                this.pictures = db.pictures
                this.users = db.users
                this.auctionSettings = db.auctionSettings
            }
            catch (e) {
                console.log('DataBaseCurrent undefined')
                Raven.captureMessage('DataBase current undefined')
            }
        }
    }

    registerUser(userToRegistration, src = './DataBase/DataBaseCurrent.json'){
        for(let user of this.users)
            if(user.userName == userToRegistration.userName)
                user.isRegistrated = true;
         this.updateDataBase(src)
    }

    disconnectUser(userToDisconnect, src = './DataBase/DataBaseCurrent.json'){
        for(let user of this.users)
            if(user.userName == userToDisconnect.userName) {
                user.isRegistrated = false;
                user.socketID = 0
            }
        this.updateDataBase(src)
    }

    getSocketIdToUser(socketId){
        console.log('give socket id to user...')
        for(let user of this.users) {
            if (user.isRegistrated && user.socketID == 0) {
                user.socketID = socketId;
                console.log(user.userName, 'got socket id: ', socketId)
                this.updateDataBase()
            }
        }
    }

    getUserBySocketId(socketID){
        console.log('find user by socketID ...')
        for(let user of this.users){
            if(user.socketID == socketID){
                console.log('user finded:', user)
                return user
            }
        }
    }

    getUsers(){
        return this.users
    }

    getPictures(){
        return this.pictures
    }

    updateUserPictures(userId, picture, finishPrice){
        console.log('update user pictures id: ', userId)
        user = this.getUserBySocketId(userId)
        console.log('find user to get picture: ', user)
        user.pictureMas.push(new Picture(picture.imagePath, picture.title, picture.author, picture.description, picture.startPrice, user.userName, finishPrice))
        user.amountOfMoney -= finishPrice
        this.updateDataBase()
    }

    getPictureByTile(pictureTile){
        console.log('find picture by name ...')
        for(let picture of this.pictures){
            if(picture.title == pictureTile){
                console.log('picture finded:', picture)
                return picture
            }
        }
    }

    updatePictureHolder(picture, maxBetUserId){
        picture = this.getPictureByTile(picture.title)
        picture.holder =  this.getUserBySocketId(maxBetUserId).userName
        this.updateDataBase()
    }

    updateDataBase(src = './DataBase/DataBaseCurrent.json'){
        fs.writeFileSync(src, JSON.stringify({ pictures: this.pictures, users: this.users, auctionSettings: this.auctionSettings }))
    }
}

module.exports = DataBase