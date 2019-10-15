const fs = require('fs');
const User = require('./User')
const Picture = require('./Picture')

class DataBase {
    constructor(isInitFromSourceDataBase) {
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
            }
        }
        else{
            try {
                let db = JSON.parse(fs.readFileSync('./DataBase/DataBaseCurrent.json'))
                this.pictures = db.pictures
                this.users = db.users
                this.auctionSettings = db.auctionSettings
            }
            catch (e) {
                console.log('DataBaseCurrent undefined')
            }
        }
    }

    registerUser(userToRegistration){
        for(let user of this.users)
            if(user.userName == userToRegistration.userName)
                user.isRegistrated = true;
         this.updateDataBase()
    }

    disconnectUser(userToDisconnect){
        for(let user of this.users)
            if(user.userName == userToDisconnect.userName) {
                user.isRegistrated = false;
                user.socketID = 0
            }
        this.updateDataBase()
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

    updateDataBase(){
        fs.writeFileSync('./DataBase/DataBaseCurrent.json', JSON.stringify({ pictures: this.pictures, users: this.users, auctionSettings: this.auctionSettings }))
    }
}

module.exports = DataBase