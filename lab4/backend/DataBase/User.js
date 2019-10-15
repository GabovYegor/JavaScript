class User{
    constructor(userName = 'defaultUser', amountOfMoney = 0){
        this.userName = userName
        this.amountOfMoney = amountOfMoney
        this.socketID = 0
        this.isRegistrated = false
        this.pictureMas = []
    }
}

module.exports = User